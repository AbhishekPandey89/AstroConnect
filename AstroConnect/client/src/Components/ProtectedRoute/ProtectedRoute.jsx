import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, token, loading } = useAuth();

  // Auth check complete hone tak wait
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  // Login nahi hai
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Admin route ke liye admin hona zaroori
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;