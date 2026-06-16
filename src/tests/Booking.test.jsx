import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Booking from '../pages/Booking';
import API from '../services/api';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('Booking page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    API.get.mockResolvedValue([
      {
        id: 1,
        name: 'Luxe Deluxe Room',
        price: 12500,
        quantity: 5,
        vacantRooms: 5,
        bedrooms: 1,
        features: ['Free WiFi', 'King Bed'],
        internet: true,
        image: 'room.jpg',
      },
    ]);
    API.patch.mockResolvedValue({});
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders booking page and loads rooms from API', async () => {
    render(<Booking />);

    expect(screen.getByText(/Book Your Stay/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search rooms.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Luxe Deluxe Room/i)).toBeInTheDocument();
    });
  });

  it('allows adding a room to cart and updates the total', async () => {
    render(<Booking />);

    await waitFor(() => expect(screen.getByText(/Luxe Deluxe Room/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: /Book Room/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Grand Total:/i })).toBeInTheDocument();
      expect(screen.getAllByText(/^Ksh 12500$/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Luxe Deluxe Room/i)).toBeInTheDocument();
    });

    expect(API.patch).toHaveBeenCalledWith('/products/1', expect.objectContaining({
      vacantRooms: 4,
      takenRooms: 1,
    }));
  });

  it('navigates to login when checkout is submitted', async () => {
    render(<Booking />);

    await waitFor(() => expect(screen.getByText(/Luxe Deluxe Room/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /Book Room/i }));

    await waitFor(() => expect(screen.getByRole('button', { name: /Proceed to Payment/i })).toBeEnabled());
    fireEvent.click(screen.getByRole('button', { name: /Proceed to Payment/i }));

    expect(navigateMock).toHaveBeenCalledWith('/login');
  });
});
