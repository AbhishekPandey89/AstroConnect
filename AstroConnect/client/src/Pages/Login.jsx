import { useState } from "react";
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const { saveLogin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      if (data.success && data.token) {
        saveLogin(data);

        const redirectTo =
          location.state?.from?.pathname || "/";

        navigate(redirectTo, {
          replace: true,
        });
      } else {
        setError(
          data.message || "Login failed."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message || "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <span className="auth-logo">
            ✦
          </span>

          <span>
            Astro<span>Connect</span>
          </span>
        </div>

        <div className="auth-heading">
          <h1>Welcome Back</h1>

          <p>
            Login to your AstroConnect account
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-field">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="auth-message auth-error">
              {error}
            </p>
          )}

          <button
            className="auth-submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="auth-footer-text">
          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;