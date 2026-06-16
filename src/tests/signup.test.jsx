import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../pages/Signup";
import { BrowserRouter } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { set } from "firebase/database";

// Mock Firebase
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signInWithPopup: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  set: jest.fn(),
}));

jest.mock("../services/firebase", () => ({
  auth: {},
  db: {},
  provider: {
    setCustomParameters: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderSignup = () =>
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });
  });

  test("renders signup form", () => {
    renderSignup();

    expect(screen.getByText(/create account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test("shows validation error when fields are empty", async () => {
    renderSignup();

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/please fill in all fields/i)
    ).toBeInTheDocument();
  });

  test("shows password mismatch error", async () => {
    renderSignup();

    fireEvent.change(screen.getByPlaceholderText(/george njenga/i), {
      target: { value: "George" },
    });

    fireEvent.change(screen.getByPlaceholderText(/njenga@gmail.com/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/min. 6 characters/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByPlaceholderText(/re-enter password/i), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/passwords do not match/i)
    ).toBeInTheDocument();
  });

  test("creates account successfully", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {
        uid: "123",
      },
    });

    updateProfile.mockResolvedValue();
    set.mockResolvedValue();

    renderSignup();

    fireEvent.change(screen.getByPlaceholderText(/george njenga/i), {
      target: { value: "George" },
    });

    fireEvent.change(screen.getByPlaceholderText(/njenga@gmail.com/i), {
      target: { value: "george@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/min. 6 characters/i), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText(/re-enter password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(updateProfile).toHaveBeenCalled();
      expect(set).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("shows firebase signup error", async () => {
    createUserWithEmailAndPassword.mockRejectedValue({
      code: "auth/email-already-in-use",
      message: "Email already exists",
    });

    renderSignup();

    fireEvent.change(screen.getByPlaceholderText(/george njenga/i), {
      target: { value: "George" },
    });

    fireEvent.change(screen.getByPlaceholderText(/njenga@gmail.com/i), {
      target: { value: "george@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/min. 6 characters/i), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText(/re-enter password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/email is already registered/i)
    ).toBeInTheDocument();
  });

  test("google signup success", async () => {
    signInWithPopup.mockResolvedValue({
      user: {
        uid: "123",
        displayName: "George",
        email: "george@test.com",
        photoURL: "photo.jpg",
      },
    });

    set.mockResolvedValue();

    renderSignup();

    fireEvent.click(
      screen.getByRole("button", {
        name: /continue with google/i,
      })
    );

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(set).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("redirects authenticated users to booking page", () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ uid: "123" });
      return jest.fn();
    });

    renderSignup();

    expect(mockNavigate).toHaveBeenCalledWith("/booking", {
      replace: true,
    });
  });
});