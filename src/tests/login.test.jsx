
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  }),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock("../services/firebase", () => ({
  auth: {},
  db: {},
  provider: {
    setCustomParameters: jest.fn(),
  },
}));

describe("Login Component", () => {
  test("renders login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();
  });

  test("shows validation error when fields are empty", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      screen.getByText("Please fill in all fields.")
    ).toBeInTheDocument();
  });

  test("updates email input value", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("you@example.com");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    expect(emailInput.value).toBe("test@example.com");
  });

  test("updates password input value", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText("Your password");

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    expect(passwordInput.value).toBe("password123");
  });

  test("renders Google sign-in button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Continue with Google")
    ).toBeInTheDocument();
  });
});

