import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

test("renders dashboard heading", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/Guest Service Portal/i)
  ).toBeInTheDocument();
});

test("renders room service card", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/Room Service/i)
  ).toBeInTheDocument();
});