import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HotelDetails from '../pages/HotelDetails';

describe('HotelDetails page', () => {
  it('renders the hotel details page with about section and location', () => {
    render(<HotelDetails />);

    expect(screen.getByText(/Welcome to Luxe Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Wi-Fi/i)).toBeInTheDocument();
    expect(screen.getByText(/Dining\/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Located at Nairobi, Kenya/i)).toBeInTheDocument();
    expect(screen.getByText(/View on Google Maps/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View on Google Maps/i })).toHaveAttribute(
      'href',
      'https://maps.google.com'
    );
  });
});
