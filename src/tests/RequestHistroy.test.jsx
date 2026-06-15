import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import RequestHistory from "../pages/RequestHistory";

vi.mock("../services/serviceApi", () => ({
  getRequests: vi.fn().mockResolvedValue([
    {
      id: 1,
      service_type: "Room Service",
      status: "Pending",
      description: "",
    },
  ]),
}));

test("renders page heading", async () => {
  render(<RequestHistory />);

  expect(
    await screen.findByText(/My Requests/i)
  ).toBeInTheDocument();
});

test("renders request item", async () => {
  render(<RequestHistory />);

  expect(
    await screen.findByText(/Room Service/i)
  ).toBeInTheDocument();

  expect(
    await screen.findByText(/Pending/i)
  ).toBeInTheDocument();
});