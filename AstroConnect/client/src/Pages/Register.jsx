import { useState } from "react";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Register = () => {
  const { saveLogin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(formData);

      if (data.success) {
        saveLogin(data);
        setSuccess("Registration successful!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="auth-message auth-error">
              {error}
            </p>
          )}

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
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>

      </div>
    </div>
  );
};

export default Register;