import { useState } from "react";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar/Navbar";
import "./Auth.css";

const Register = () => {
  const { saveLogin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // FORM VALIDATION
  // =========================
  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Empty fields
    if (!name || !email || !phone || !password || !confirmPassword) {
      return "Please fill all fields.";
    }

    // Name validation
    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(name)) {
      return "Full name can contain only letters and spaces.";
    }

    if (name.length < 2) {
      return "Please enter a valid full name.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return "Phone number must be exactly 10 digits.";
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================

    // Minimum 8 characters
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    // At least 1 capital letter
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least 1 capital letter.";
    }

    // At least 1 small letter
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least 1 small letter.";
    }

    // At least 1 number
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least 1 number.";
    }

    // At least 1 special character
    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {
      return "Password must contain at least 1 special character.";
    }

    // Confirm password
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      if (data.success && data.token) {
        saveLogin(data);
        setSuccess("Registration successful!");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message ||
          "Unable to register. Please try again."
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
            <h1>Create Account</h1>
            <p>Join AstroConnect</p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* NAME */}
            <div className="auth-field">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* EMAIL */}
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

            {/* PHONE */}
            <div className="auth-field">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
              />
            </div>

            {/* PASSWORD */}
            <div className="auth-field">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="auth-field">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="auth-message auth-error">
                {error}
              </p>
            )}

            {/* SUCCESS */}
            {success && (
              <p className="auth-message auth-success">
                {success}
              </p>
            )}

            <button
              className="auth-submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <p className="auth-footer-text">
            Already have an account?{" "}

            <a href="/login">
              Login
            </a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Register;