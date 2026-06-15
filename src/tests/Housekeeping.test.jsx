import {
  render,
  screen
} from "@testing-library/react";

import Housekeeping from "../pages/Housekeeping";

test("renders housekeeping heading", () => {
  render(<Housekeeping />);

  expect(
    screen.getByText(/Housekeeping/i)
  ).toBeInTheDocument();
});

test("renders submit button", () => {
  render(<Housekeeping />);

  expect(
    screen.getByRole("button")
  ).toBeInTheDocument();
});