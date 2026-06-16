
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { onAuthStateChanged } from "firebase/auth";
import Login from "../pages/login.jsx";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null);
    return vi.fn();
  }),
  GoogleAuthProvider: vi.fn(),
}));

vi.mock("../services/firebase", () => ({
  auth: {},
  db: {},
  provider: {
    setCustomParameters: vi.fn(),
  },
}));

vi.mock("../services/auth", () => ({
  logOut: vi.fn(),
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

    fireEvent.submit(screen.getByRole("form"));

    expect(
      await screen.findByText("Please fill in all fields.")
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

  test("shows logout option when user is already signed in", () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ email: "user@example.com" });
      return vi.fn();
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/already signed in as/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });
});

