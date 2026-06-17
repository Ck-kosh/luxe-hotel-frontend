import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import RoomListing from '../pages/RoomListing';

const rooms = [
  { id: 1, name: 'Presidential Suite', price: 25000 },
  { id: 2, name: 'Standard Room', price: 8500 },
];

describe('RoomListing page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => rooms,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and displays available rooms', async () => {
    render(<RoomListing />);

    expect(screen.getByText(/Available Rooms/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Presidential Suite/i)).toBeInTheDocument();
      expect(screen.getByText(/Price: Ksh 25000/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Standard Room/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: Ksh 8500/i)).toBeInTheDocument();
  });
});
