/**
 * Daraja API Service
 * Handles M-Pesa payment integration through Safaricom's Daraja API
 * All requests go through your backend for security (credentials stored server-side)
 */

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Initiate STK Push for M-Pesa payment
 * @param {Object} paymentData - Payment details
 * @param {string} paymentData.phoneNumber - Customer phone number (format: 254XXXXXXXXX)
 * @param {number} paymentData.amount - Amount in KES
 * @param {string} paymentData.accountReference - Booking/Account reference
 * @param {string} paymentData.description - Transaction description
 * @returns {Promise<Object>} Response with checkout request ID or error
 */
export async function initiateSTKPush(paymentData) {
  try {
    const response = await fetch(`${BACKEND_URL}/payments/stk-push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`STK Push failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("STK Push error:", error);
    throw error;
  }
}

/**
 * Check transaction status/payment query
 * @param {string} checkoutRequestId - The checkout request ID from STK Push
 * @returns {Promise<Object>} Transaction status details
 */
export async function checkTransactionStatus(checkoutRequestId) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/payments/query-status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checkoutRequestId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Status query failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Transaction status error:", error);
    throw error;
  }
}

/**
 * Refund a completed transaction
 * @param {Object} refundData - Refund details
 * @param {string} refundData.transactionId - Original transaction ID
 * @param {number} refundData.amount - Refund amount
 * @param {string} refundData.reason - Reason for refund
 * @returns {Promise<Object>} Refund response
 */
export async function refundTransaction(refundData) {
  try {
    const response = await fetch(`${BACKEND_URL}/payments/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refundData),
    });

    if (!response.ok) {
      throw new Error(`Refund failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Refund error:", error);
    throw error;
  }
}

/**
 * Get payment history for a user/reference
 * @param {string} accountReference - Account reference to query
 * @returns {Promise<Array>} Array of payment transactions
 */
export async function getPaymentHistory(accountReference) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/payments/history/${accountReference}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`History query failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Payment history error:", error);
    throw error;
  }
}

export default {
  initiateSTKPush,
  checkTransactionStatus,
  refundTransaction,
  getPaymentHistory,
};
