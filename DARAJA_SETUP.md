# Daraja API Backend Integration Guide

This guide explains how to set up the backend endpoints needed for frontend Daraja API communication.

## Prerequisites

- Daraja Developer Account: https://developer.safaricom.co.ke
- Consumer Key and Consumer Secret (from your app credentials)
- Safaricom Passkey
- Business Shortcode or Till Number

## Backend Endpoints to Implement

Your backend (`http://localhost:8000`) must implement these endpoints:

### 1. POST `/payments/stk-push`

**Purpose**: Initiate M-Pesa STK Push (payment prompt)

**Request Body**:
```json
{
  "phoneNumber": "254712345678",
  "amount": 1000,
  "accountReference": "booking-12345",
  "description": "Hotel Booking Payment - Ref: booking-12345"
}
```

**Response** (Successful):
```json
{
  "ResponseCode": "0",
  "ResponseDescription": "Success",
  "CheckoutRequestID": "ws_CO_DMZ_xxx",
  "CustomerMessage": "success"
}
```

**Error Response**:
```json
{
  "ResponseCode": "400",
  "errorMessage": "Invalid phone number"
}
```

### 2. POST `/payments/query-status`

**Purpose**: Check transaction status

**Request Body**:
```json
{
  "checkoutRequestId": "ws_CO_DMZ_xxx"
}
```

**Response** (Successful Payment):
```json
{
  "ResponseCode": "0",
  "ResultCode": 0,
  "ResultDesc": "The service request has been processed successfully",
  "MerchantRequestID": "xxx",
  "CheckoutRequestID": "ws_CO_DMZ_xxx",
  "ResultCode": 0,
  "ReceiptNumber": "CTJ7V6EKV9",
  "Amount": 1000,
  "Balance": -1000,
  "TransactionDate": "20240115103000",
  "PhoneNumber": "254712345678"
}
```

### 3. POST `/payments/refund`

**Purpose**: Refund a transaction

**Request Body**:
```json
{
  "transactionId": "CTJ7V6EKV9",
  "amount": 1000,
  "reason": "Booking cancelled"
}
```

**Response**:
```json
{
  "ResponseCode": "0",
  "ConversationID": "xxx",
  "OriginalConversationID": "xxx",
  "ResponseDescription": "Success"
}
```

### 4. GET `/payments/history/:accountReference`

**Purpose**: Get payment history for a booking/account

**Query Parameters**: None

**Response**:
```json
[
  {
    "transactionId": "CTJ7V6EKV9",
    "amount": 1000,
    "date": "2024-01-15",
    "status": "success",
    "phoneNumber": "254712345678"
  }
]
```

## Example Node.js/Express Backend Implementation

```javascript
import axios from "axios";

const DARAJA_BASE_URL = "https://api.sandbox.safaricom.co.ke";
const CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET;
const PASSKEY = process.env.DARAJA_PASSKEY;
const SHORTCODE = process.env.DARAJA_SHORTCODE;
const CALLBACK_URL = process.env.DARAJA_CALLBACK_URL;

// Get Daraja Access Token
async function getAccessToken() {
  const auth = Buffer.from(
    `${CONSUMER_KEY}:${CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.get(
      `${DARAJA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
}

// STK Push Endpoint
app.post("/payments/stk-push", async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference, description } =
      req.body;

    // Validate input
    if (!phoneNumber || !amount || !accountReference) {
      return res
        .status(400)
        .json({
          ResponseCode: "400",
          errorMessage: "Missing required fields",
        });
    }

    const accessToken = await getAccessToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[^\d]/g, "")
      .slice(0, -3);
    const password = Buffer.from(
      `${SHORTCODE}${PASSKEY}${timestamp}`
    ).toString("base64");

    const response = await axios.post(
      `${DARAJA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(amount),
        PartyA: phoneNumber,
        PartyB: SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: CALLBACK_URL,
        AccountReference: accountReference,
        TransactionDesc: description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json({
      ResponseCode: "0",
      ResponseDescription: "Success",
      CheckoutRequestID: response.data.CheckoutRequestID,
      CustomerMessage: response.data.CustomerMessage,
    });
  } catch (error) {
    console.error("STK Push error:", error);
    res.status(500).json({
      ResponseCode: "500",
      errorMessage: error.message,
    });
  }
});

// Query Status Endpoint
app.post("/payments/query-status", async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;

    if (!checkoutRequestId) {
      return res.status(400).json({
        ResponseCode: "400",
        errorMessage: "Missing checkoutRequestId",
      });
    }

    const accessToken = await getAccessToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[^\d]/g, "")
      .slice(0, -3);
    const password = Buffer.from(
      `${SHORTCODE}${PASSKEY}${timestamp}`
    ).toString("base64");

    const response = await axios.post(
      `${DARAJA_BASE_URL}/mpesa/stkpushquery/v1/query`,
      {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Query status error:", error);
    res.status(500).json({
      ResponseCode: "500",
      errorMessage: error.message,
    });
  }
});
```

## Environment Variables

Add these to your backend `.env` file:

```
DARAJA_CONSUMER_KEY=your_consumer_key
DARAJA_CONSUMER_SECRET=your_consumer_secret
DARAJA_PASSKEY=your_passkey
DARAJA_SHORTCODE=your_business_shortcode
DARAJA_CALLBACK_URL=https://yourdomain.com/payments/callback
```

## Getting Your Credentials

1. Visit https://developer.safaricom.co.ke
2. Log in or create an account
3. Create a new app
4. Get your:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode / Till Number
   - Passkey (found in test credentials section)

## Testing in Sandbox

Daraja provides test credentials:
- Test Phone: 254708374149
- Test Amount: Any amount (money is not deducted)

## Callback URL

Set up a callback endpoint to receive payment confirmations:

```javascript
app.post("/payments/callback", (req, res) => {
  const callbackData = req.body.Body.stkCallback;

  if (callbackData.ResultCode === 0) {
    // Payment successful - update booking status
    console.log("Payment successful:", callbackData);
  } else {
    // Payment failed
    console.log("Payment failed:", callbackData);
  }

  // Always respond with 200 to Daraja
  res.json({});
});
```

## Production vs Sandbox

- **Sandbox**: https://api.sandbox.safaricom.co.ke (for testing)
- **Production**: https://api.safaricom.co.ke (for live payments)

Switch by updating the `DARAJA_BASE_URL` environment variable.
