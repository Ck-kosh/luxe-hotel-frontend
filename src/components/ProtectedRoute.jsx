import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking access...</p>
      </div>
    );
  }
  
  // Not logged in OR not admin email = kick to login
  if (!user || !user.email.toLowerCase().endsWith("@hoteladmin.com")) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Admin is logged in = show the page
  return children;
}