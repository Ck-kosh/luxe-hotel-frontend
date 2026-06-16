import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function simplifyError(code, message) {
  if (!code && !message) return "Something went wrong. Please try again.";
  if (code?.includes("email-already-in-use"))    return "Email is already registered.";
  if (code?.includes("weak-password"))           return "Password must be at least 6 characters.";
  if (code?.includes("invalid-email"))           return "Invalid email address.";
  if (code?.includes("popup-closed"))            return "Google sign-in was cancelled.";
  if (code?.includes("popup-blocked"))           return "Popup was blocked. Please allow popups for this site and try again.";
  if (code?.includes("cancelled-popup-request")) return "Another sign-in is already in progress.";
  if (code?.includes("unauthorized-domain"))     return "Domain not authorised. Add it in Firebase Console → Authentication → Authorized domains.";
  if (code?.includes("operation-not-allowed"))   return "Google sign-in is not enabled. Enable it in Firebase Console → Authentication → Sign-in method.";
  if (code?.includes("network-request-failed"))  return "Network error. Check your internet connection.";
  return `Something went wrong (${code ?? "unknown"}). Please try again.`;
}

let popupPending = false;

function Signup() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  // Listen to auth state changes and navigate when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to booking
        navigate("/booking", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // ── Email / password signup ───────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!navigator.onLine) {
      setError("No internet connection. Please reconnect and try again.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);

      // Set display name in Firebase Auth immediately
      await updateProfile(cred.user, { displayName: form.name });

      // Write to Realtime Database
      await set(ref(db, "users/" + cred.user.uid), {
        username:  form.name,
        email:     form.email,
        photo:     null,
        provider:  "email",
        createdAt: Date.now(),
        lastLogin: Date.now(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err.code, err.message);
      setError(simplifyError(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  // ── Google popup signup ───────────────────────────────────────────────────

  const handleGoogle = async () => {
    if (popupPending) {
      setError("A sign-in window is already open.");
      return;
    }
    if (!navigator.onLine) {
      setError("No internet connection. Please reconnect and try again.");
      return;
    }

    setError("");
    popupPending = true;

    try {
      // Force account picker so user can choose / switch accounts
      provider.setCustomParameters({ prompt: "select_account" });

      // ⚠️  Open popup FIRST — setLoading AFTER — or browsers block the popup
      const result = await signInWithPopup(auth, provider);

      setLoading(true);

      const user = result.user;

      await set(ref(db, "users/" + user.uid), {
        username:  user.displayName,
        email:     user.email,
        photo:     user.photoURL,
        provider:  "google",
        createdAt: Date.now(),
        lastLogin: Date.now(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Google sign-in error:", err.code, err.message);
      setError(simplifyError(err.code, err.message));
    } finally {
      popupPending = false;
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-teal-700 px-8 py-8 text-center">
            <h1 className="text-3xl font-bold text-white tracking-wide">Create Account</h1>
            <p className="text-teal-200 mt-1 text-sm">Join Luxe Hotel and start your journey</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8 space-y-5">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="George Njenga"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="njenga@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  id="signup-confirm"
                  type="password"
                  name="confirm"
                  placeholder="Re-enter password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
              </div>

              <button
                id="signup-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google button — never disabled before popup opens */}
            <button
              id="signup-google-btn"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-teal-700 font-semibold hover:underline">
                Log In
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
