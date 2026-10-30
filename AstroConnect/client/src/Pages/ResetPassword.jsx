import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./Auth.css";

const API_URL = "http://localhost:5000/api";

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }

      setMessage(data.message || "Password reset successfully.");
      setPassword("");
      setConfirmPassword("");
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

          <h2 className="auth-heading">Reset Password</h2>

          <p>Enter and confirm your new password.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {message && (
              <p role="status" style={{ color: "green" }}>
                {message} <Link to="/login">Go to Login</Link>
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="auth-footer-text">
            <Link to="/login">Back to Login</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default ResetPassword;