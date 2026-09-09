import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Email saved during forgot-password process
  const email = localStorage.getItem("resetEmail");

  // OTP must already be verified
  const otpVerified = localStorage.getItem("otpVerified");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ===============================
    // CHECK OTP VERIFICATION
    // ===============================

    if (!email || otpVerified !== "true") {
      setError(
        "OTP verification required. Please start the password reset process again."
      );
      return;
    }

    // ===============================
    // VALIDATION
    // ===============================

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // ===============================
      // RESET PASSWORD API
      // ===============================

      const response = await fetch(
        "http://localhost:5000/api/students/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Reset password response:", data);

      // ===============================
      // API ERROR
      // ===============================

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to reset password"
        );
      }

      // ===============================
      // SUCCESS
      // ===============================

      setSuccess(
        data.message ||
          "Password reset successfully!"
      );

      // Remove temporary reset data
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otpVerified");

      // Go back to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Reset password error:", err);

      setError(
        err.message || "Failed to reset password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}

        <div className="login-logo">
          🎓 CampusHub
        </div>

        {/* HEADER */}

        <h1>
          Reset Password
        </h1>

        <p className="login-subtitle">
          Create a new password for your account.
        </p>

        <form onSubmit={handleResetPassword}>

          {/* NEW PASSWORD */}

          <div className="input-group">

            <label>
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="input-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>

          {/* ERROR */}

          {error && (
            <p
              style={{
                color: "#ff3b3b",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}

          {/* SUCCESS */}

          {success && (
            <p
              style={{
                color: "#22c55e",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              {success}
            </p>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;