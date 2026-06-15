import {
  render,
  screen
} from "@testing-library/react";

import Amenities from "../pages/Amenities";

test("renders amenities heading", () => {
  render(<Amenities />);

  expect(
    screen.getByText(/Amenities Booking/i)
  ).toBeInTheDocument();
});

test("renders guest name input", () => {
  render(<Amenities />);

  expect(
    screen.getByPlaceholderText(/Guest Name/i)
  ).toBeInTheDocument();
});

test("renders amenity dropdown", () => {
  render(<Amenities />);

  expect(
    screen.getByRole("combobox")
  ).toBeInTheDocument();
});

test("renders book amenity button", () => {
  render(<Amenities />);

  expect(
    screen.getByRole("button", {
      name: /Book Amenity/i
    })
  ).toBeInTheDocument();
});