import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import darajaApi from '../services/darajaApi';

function Cart({
  cart,
  handleBuy,
  user,
  authLoading
}) {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '', // New field for phone number
    paymentMethod: 'mpesa' // Default to M-Pesa
  });
  const [paymentStatus, setPaymentStatus] = useState(null); // To show payment feedback

  // TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum + (item.price * item.cartQuantity),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onProceedToCheckout = () => {
    if (cart.length === 0) return;

    if (!user) {
      if (authLoading) {
        alert("Checking login status. Please wait a moment.");
        return;
      }
      navigate("/login", { state: { from: "/booking" } });
      return;
    }

    setIsCheckingOut(true);
    setPaymentStatus(null); // Reset payment status on new checkout attempt
  };

  const onConfirmPayment = async (e) => {
    e.preventDefault();
    setPaymentStatus('Processing...');

    // Basic validation
    if (!userDetails.fullName || !userDetails.email || !userDetails.phoneNumber) {
      setPaymentStatus('Please fill in all required details.');
      return;
    }

    const paymentData = {
      phone_number: userDetails.phoneNumber,
      amount: total,
      booking_id: 1,
      user_id: 1,
      account_reference: `booking-${Date.now()}`,
      transaction_description: `Hotel booking payment for ${userDetails.fullName}`,
    };

    try {
      const response = await darajaApi.initiateSTKPush(paymentData);


      const rc = response?.ResponseCode ?? response?.responseCode ?? response?.ResponseCode;
      if (rc === '0' || rc === 0) {
        setPaymentStatus(`Payment initiated via M-Pesa. Please check your phone.`);
        if (typeof handleBuy === 'function') handleBuy(userDetails);

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus(`Payment initiated via ${userDetails.paymentMethod}. Please check your phone.`);
        // Call handleBuy to proceed to login after payment
        handleBuy();
        // ed46851 (initial commit)
      } else {
        const msg = response?.errorMessage || response?.ResponseDescription || response?.error || response?.message || 'Unknown error';
        setPaymentStatus(`Payment failed: ${msg}`);
      }
    } 
  }catch (error) {
      console.error('Payment request error:', error);
      setPaymentStatus(`Payment failed: ${error.message || 'An error occurred while processing your payment.'}`);
    }
  };
  

  if (isCheckingOut) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-5">
        <button 
          onClick={() => setIsCheckingOut(false)}
          className="text-gray-500 hover:text-black mb-4 flex items-center gap-2"
        >
          ← Back to Summary
        </button>
        
        <h2 className="text-3xl font-semibold mb-6">
          Checkout Details
        </h2>

        <form onSubmit={onConfirmPayment} className="space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Names
            </label>
            <input
              required
              type="text"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleInputChange}
              placeholder="Elias Kosh"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="elias@gmail.com"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* PHONE NUMBER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (e.g., 254769021360)
            </label>
            <input
              required
              type="tel"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleInputChange}
              placeholder="254769021360"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition ${userDetails.paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50 ring-2 ring-green-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={userDetails.paymentMethod === 'mpesa'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span className="font-semibold text-green-600">M-Pesa</span>
              </label>

              <label className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition ${userDetails.paymentMethod === 'airtel' ? 'border-red-500 bg-red-50 ring-2 ring-red-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="airtel"
                  checked={userDetails.paymentMethod === 'airtel'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span className="font-semibold text-red-600">Airtel Money</span>
              </label>
            </div>
          </div>

          {/* PAYMENT STATUS FEEDBACK */}
          {paymentStatus && (
            <div className={`p-3 rounded-xl text-center ${paymentStatus.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
              {paymentStatus}
            </div>
          )}

          {/* TOTAL DISPLAY */}
          <div className="pt-4 border-t mt-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Grand Total:</span>
              <span className="text-2xl font-bold">Ksh {total}</span>
            </div>
          </div>

          {/* CONFIRM BUTTON */}
          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition font-semibold"
          >
            Confirm & Pay Ksh {total}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-5">
      {/* TITLE */}
      <h2 className="text-3xl font-semibold mb-6">
        Booking Summary
      </h2>

      {/* EMPTY */}
      {cart.length === 0 ? (
        <p className="text-gray-500">
          No rooms selected
        </p>
      ) : (
        <div className="max-h-100 overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border-b py-4 last:border-0"
            >
              <p className="font-semibold text-lg">
                {item.name}
              </p>

              {item.bedrooms && (
                <p className="text-gray-600">
                  {item.bedrooms} Bedroom{item.bedrooms > 1 ? "s" : ""}
                </p>
              )}

              {item.internet !== undefined && (
                <p className="text-gray-600">
                  {item.internet ? "Internet available" : "No internet"}
                </p>
              )}

              <div className="flex justify-between items-end mt-2">
                <div className="text-sm text-gray-500">
                  <p>Rooms: {item.cartQuantity}</p>
                  <p>Ksh {item.price} / night</p>
                </div>
                <p className="font-bold text-lg">
                  Ksh {item.price * item.cartQuantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOTAL */}
      {cart.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-2xl font-bold flex justify-between items-center">
            <span>Grand Total:</span>
            <span>Ksh {total}</span>
          </h3>
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={onProceedToCheckout}
        disabled={cart.length === 0}
        className={`mt-6 w-full py-4 rounded-xl transition font-semibold ${
          cart.length === 0 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default Cart;