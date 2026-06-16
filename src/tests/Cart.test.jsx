import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';

describe('Cart', () => {
  test('shows empty message and disabled proceed button when cart is empty', () => {
    render(<Cart cart={[]} handleBuy={jest.fn()} />);
    expect(screen.getByText(/No rooms selected/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Proceed to Payment/i });
    expect(button).toBeDisabled();
  });

  test('renders cart items and total', () => {
    const cart = [
      { id: 1, name: 'Room A', price: 1000, cartQuantity: 2 },
      { id: 2, name: 'Room B', price: 1500, cartQuantity: 1 }
    ];

    render(<Cart cart={cart} handleBuy={jest.fn()} />);

    expect(screen.getByText('Room A')).toBeInTheDocument();
    expect(screen.getByText('Room B')).toBeInTheDocument();
    expect(screen.getByText(/Ksh 3500/)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Proceed to Payment/i });
    expect(button).toBeEnabled();
  });

  test('opens checkout and shows validation message when submitting empty details', async () => {
    const cart = [{ id: 1, name: 'Room A', price: 500, cartQuantity: 1 }];
    render(<Cart cart={cart} handleBuy={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /Proceed to Payment/i }));

    expect(screen.getByLabelText(/Full Names/i)).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', { name: /Confirm & Pay/i });
    fireEvent.click(confirmButton);

    expect(await screen.findByText(/Please fill in all required details\./i)).toBeInTheDocument();
  });
});
