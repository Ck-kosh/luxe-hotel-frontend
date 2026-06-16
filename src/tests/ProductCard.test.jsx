import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  it('renders product details and enables booking when rooms are available', () => {
    const product = {
      id: 1,
      name: 'Executive Suite',
      price: 14500,
      bedrooms: 2,
      features: ['Pool', 'Breakfast'],
      internet: true,
      vacantRooms: 3,
      image: 'room.jpg',
    };
    const addToCart = vi.fn();

    render(<ProductCard product={product} addToCart={addToCart} />);

    expect(screen.getByText(/Executive Suite/i)).toBeInTheDocument();
    expect(screen.getByText(/Ksh 14500/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Features: Pool, Breakfast/i)).toBeInTheDocument();
    expect(screen.getByText(/Internet available/i)).toBeInTheDocument();
    expect(screen.getByText(/Available Rooms: 3/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Book Room/i });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledWith(product);
  });

  it('disables the button when no rooms are available', () => {
    const product = {
      id: 2,
      name: 'Garden Villa',
      price: 9800,
      bedrooms: 1,
      features: ['Garden View'],
      internet: false,
      vacantRooms: 0,
      image: 'villa.jpg',
    };
    const addToCart = vi.fn();

    render(<ProductCard product={product} addToCart={addToCart} />);

    const button = screen.getByRole('button', { name: /Fully Booked/i });
    expect(button).toBeDisabled();
  });
});
