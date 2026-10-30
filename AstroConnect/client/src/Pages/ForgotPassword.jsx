import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./Auth.css";

const API_URL = "http://localhost:5000/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed. Please try again.");
      }

      setMessage(
        data.message ||
          "If an account exists with this email, password reset instructions will be sent."
      );
    } catch (err) {
      setError(
        err.message || "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-brand">
            <h1>AstroConnect</h1>
          </div>

          <h2 className="auth-heading">Forgot Password?</h2>

          <p>
            Enter your registered email address to receive a password reset
            link.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="reset-email">Email Address</label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                autoComplete="email"
                required
              />
            </div>

            {message && (
              <p role="status" style={{ color: "green" }}>
                {message}
              </p>
            )}

            {error && (
              <p role="alert" style={{ color: "red" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="auth-footer-text">
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default ForgotPassword;