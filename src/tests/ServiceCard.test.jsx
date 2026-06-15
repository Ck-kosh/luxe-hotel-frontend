import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

test("renders title", () => {
  render(
    <BrowserRouter>
      <ServiceCard
        title="Room Service"
        route="/room-service"
      />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/Room Service/i)
  ).toBeInTheDocument();
});

test("renders view details link", () => {
  render(
    <BrowserRouter>
      <ServiceCard
        title="Room Service"
        route="/room-service"
      />
    </BrowserRouter>
  );

  expect(
    screen.getByRole("link", {
      name: /View Details/i,
    })
  ).toBeInTheDocument();
});

test("link points to correct route", () => {
  render(
    <BrowserRouter>
      <ServiceCard
        title="Room Service"
        route="/room-service"
      />
    </BrowserRouter>
  );

  expect(
    screen.getByRole("link", {
      name: /View Details/i,
    })
  ).toHaveAttribute("href", "/room-service");
});