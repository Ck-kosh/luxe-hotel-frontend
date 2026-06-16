import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders the search input with correct placeholder and initial value', () => {
    const search = 'initial query';
    const setSearch = vi.fn();
    render(<SearchBar search={search} setSearch={setSearch} />);

    const searchInput = screen.getByPlaceholderText('Search rooms...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue(search);
  });

  it('calls setSearch with the new value when input changes', async () => {
    const search = '';
    const setSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar search={search} setSearch={setSearch} />);

    const searchInput = screen.getByPlaceholderText('Search rooms...');
    await user.type(searchInput, 'new query');

    expect(setSearch).toHaveBeenCalledTimes(9); // 'new query' has 9 characters
    expect(setSearch).toHaveBeenCalledWith('n');
    expect(setSearch).toHaveBeenCalledWith('e');
    expect(setSearch).toHaveBeenCalledWith('w');
    expect(setSearch).toHaveBeenCalledWith(' ');
    expect(setSearch).toHaveBeenCalledWith('q');
    expect(setSearch).toHaveBeenCalledWith('u');
    expect(setSearch).toHaveBeenCalledWith('e');
    expect(setSearch).toHaveBeenCalledWith('r');
    expect(setSearch).toHaveBeenCalledWith('y');
  });

  it('applies the correct Tailwind CSS classes', () => {
    const search = '';
    const setSearch = vi.fn();
    render(<SearchBar search={search} setSearch={setSearch} />);

    const divElement = screen.getByRole('textbox').closest('div');
    expect(divElement).toHaveClass('w-full');

    const searchInput = screen.getByPlaceholderText('Search rooms...');
    expect(searchInput).toHaveClass('w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500');
  });
});