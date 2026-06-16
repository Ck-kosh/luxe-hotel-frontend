/**
 * Example M-Pesa Payment Component
 * Demonstrates how to use the Daraja API service
 */

import { useState } from "react";
import * as darajaApi from "../services/darajaApi";

export default function MpesaPayment({ bookingId, amount, phoneNumber }) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Handle payment initiation
   */
  const handleInitiatePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate phone number (should be 254XXXXXXXXX format)
      if (!/^254\d{9}$/.test(phoneNumber)) {
        throw new Error(
          "Invalid phone number. Use format: 254XXXXXXXXX"
        );
      }

      const paymentData = {
        phoneNumber,
        amount: Math.ceil(amount), // Amount must be whole number in KES
        accountReference: bookingId || `booking-${Date.now()}`,
        description: `Hotel Booking Payment - Ref: ${bookingId}`,
      };

      console.log("Initiating STK Push with data:", paymentData);

      const response =
        await darajaApi.initiateSTKPush(paymentData);

      if (response.ResponseCode === "0") {
        setPaymentStatus({
          state: "pending",
          checkoutRequestId: response.CheckoutRequestID,
          message: "Payment prompt sent to your phone",
        });

        // Poll for payment status
        pollPaymentStatus(response.CheckoutRequestID);
      } else {
        throw new Error(
          response.errorMessage ||
            "Failed to initiate payment"
        );
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      setPaymentStatus({ state: "failed" });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Poll transaction status periodically
   */
  const pollPaymentStatus = async (checkoutRequestId) => {
    let attempts = 0;
    const maxAttempts = 12; // 2 minutes (10 seconds per poll)

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setPaymentStatus({
          state: "timeout",
          message: "Payment confirmation timeout",
        });
        return;
      }

      try {
        const response = await darajaApi.checkTransactionStatus(
          checkoutRequestId
        );

        if (
          response.ResultCode === "0" ||
          response.ResultCode === 0
        ) {
          setPaymentStatus({
            state: "success",
            transactionId: response.ReceiptNumber,
            message: "Payment completed successfully!",
          });
        } else if (
          response.ResultCode === "1" ||
          response.ResultCode === 1
        ) {
          // Payment still pending
          setPaymentStatus({
            state: "pending",
            message: `Waiting for payment confirmation... (${attempts + 1}/${maxAttempts})`,
          });
          setTimeout(poll, 10000); // Poll every 10 seconds
          attempts++;
        } else {
          throw new Error(
            response.ResultDesc || "Payment failed"
          );
        }
      } catch (err) {
        console.error("Status check error:", err);
        // Continue polling on error
        setTimeout(poll, 10000);
        attempts++;
      }
    };

    poll();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        M-Pesa Payment
      </h2>

      <div className="mb-4">
        <p className="text-gray-600">
          <strong>Amount:</strong> KES {amount}
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> {phoneNumber}
        </p>
        <p className="text-gray-600">
          <strong>Reference:</strong> {bookingId}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {paymentStatus && (
        <div
          className={`mb-4 p-3 rounded ${
            paymentStatus.state === "success"
              ? "bg-green-100 text-green-700"
              : paymentStatus.state === "failed"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <strong>{paymentStatus.state.toUpperCase()}:</strong>{" "}
          {paymentStatus.message}
          {paymentStatus.transactionId && (
            <p className="text-sm mt-1">
              Transaction ID: {paymentStatus.transactionId}
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleInitiatePayment}
        disabled={isLoading || paymentStatus?.state === "success"}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "Processing..." : "Pay with M-Pesa"}
      </button>
    </div>
  );
}
