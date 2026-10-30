import { useState } from "react";
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar/Navbar";
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

  // LOGIN VALIDATION
  const validateForm = () => {
    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      return "Please enter your email address.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!password) {
      return "Please enter your password.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  // LOGIN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (data.success && data.token) {
        saveLogin(data);

        if (data.user?.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          const redirectTo =
            location.state?.from?.pathname || "/";

          navigate(redirectTo, { replace: true });
        }
      } else {
        setError(
          data.message || "Invalid email or password."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Unable to login. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">

          <div className="auth-brand">
            <span className="auth-logo">✦</span>

            <span>
              Astro<span>Connect</span>
            </span>
          </div>

          <div className="auth-heading">
            <h1>Welcome Back</h1>
            <p>Login to your AstroConnect account</p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* EMAIL */}
            <div className="auth-field">
              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* PASSWORD */}
            <div className="auth-field">
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <div className="forgot-password-row">
                <Link
                  to="/forgot-password"
                  className="forgot-password-link"
                  state={{ email: formData.email }}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="auth-message auth-error">
                {error}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              className="auth-submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
    </>
  );
};

export default Login;