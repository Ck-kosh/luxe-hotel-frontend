import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../services/auth";
import { auth } from "../services/firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await logIn(email, password);
      
      // Security: Only allow admin emails. Change this to your domain
      const adminDomain = "@hoteladmin.com";
      if (!email.toLowerCase().endsWith(adminDomain)) {
        await auth.signOut();
        throw new Error(`Access denied. Use ${adminDomain} email only`);
      }

      // Success → go to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Check email + password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-2">Luxe Hotel Management</p>
        </div>

        {error && (
          <div className="bg-red-50 border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
            <input 
              type="email" 
              placeholder="admin@hoteladmin.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold p-3 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Only @hoteladmin.com emails can access this portal
        </p>
      </form>
    </div>
  );
}