import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // Authentication loading
  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Admin-only route
  if (adminOnly && user.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // Nested route render
  return <Outlet />;
};

export default ProtectedRoute;