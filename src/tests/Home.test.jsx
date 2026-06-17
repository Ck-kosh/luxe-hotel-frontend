import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../pages/Home';

const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('Home page', () => {
  it('renders hero content and navigates when buttons are clicked', () => {
    render(<Home />);

    expect(screen.getByText(/Luxe Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience elegant comfort/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Book Now/i }));
    expect(navigateMock).toHaveBeenCalledWith('/booking');

    fireEvent.click(screen.getByRole('button', { name: /Explore Services/i }));
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });
});
