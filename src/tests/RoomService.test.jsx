import {
  render,
  screen
} from "@testing-library/react";

import RoomService from "../pages/RoomService";

test("renders room service heading", () => {
  render(<RoomService />);

  expect(
    screen.getByText(/Room Service/i)
  ).toBeInTheDocument();
});

test("renders order button", () => {
  render(<RoomService />);

  expect(
    screen.getByRole("button")
  ).toBeInTheDocument();
});