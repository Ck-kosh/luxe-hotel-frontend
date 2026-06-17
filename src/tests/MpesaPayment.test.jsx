import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MpesaPayment from '../components/MpesaPayment';
import * as darajaApi from '../services/darajaApi';

vi.mock('../services/darajaApi', () => ({
  initiateSTKPush: vi.fn(),
  checkTransactionStatus: vi.fn(),
}));

describe('MpesaPayment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders amount, phone and booking reference', () => {
    render(
      <MpesaPayment
        bookingId="booking-123"
        amount={5500}
        phoneNumber="254712345678"
      />
    );

    expect(screen.getByText(/M-Pesa Payment/i)).toBeInTheDocument();
    expect(screen.getByText(/KES 5500/i)).toBeInTheDocument();
    expect(screen.getByText(/254712345678/i)).toBeInTheDocument();
    expect(screen.getByText(/booking-123/i)).toBeInTheDocument();
  });

  it('shows error when phone number format is invalid', async () => {
    render(
      <MpesaPayment
        bookingId="booking-123"
        amount={3500}
        phoneNumber="0712345678"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Pay with M-Pesa/i }));

    expect(await screen.findByText(/Invalid phone number/i)).toBeInTheDocument();
    expect(darajaApi.initiateSTKPush).not.toHaveBeenCalled();
  });

  it('initiates payment and shows success when the transaction completes', async () => {
    darajaApi.initiateSTKPush.mockResolvedValueOnce({
      ResponseCode: '0',
      CheckoutRequestID: 'ABC123',
    });

    darajaApi.checkTransactionStatus.mockResolvedValueOnce({
      ResultCode: '0',
      ReceiptNumber: 'REC123',
      ResultDesc: 'Success',
    });

    render(
      <MpesaPayment
        bookingId="booking-456"
        amount={1200}
        phoneNumber="254712345678"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Pay with M-Pesa/i }));

    await waitFor(() => {
      expect(darajaApi.initiateSTKPush).toHaveBeenCalledWith({
        phoneNumber: '254712345678',
        amount: 1200,
        accountReference: 'booking-456',
        description: expect.stringContaining('Hotel Booking Payment'),
      });
    });

    expect(await screen.findByText(/Payment completed successfully!/i)).toBeInTheDocument();
    expect(screen.getByText(/Transaction ID: REC123/i)).toBeInTheDocument();
  });
});
