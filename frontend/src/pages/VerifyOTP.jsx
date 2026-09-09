import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const email = localStorage.getItem("resetEmail");

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Email not found. Please request OTP again.");
      return;
    }

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/students/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            otp: otp.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("Verify OTP response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid OTP"
        );
      }

      // OTP verified
      localStorage.setItem(
        "otpVerified",
        "true"
      );

      // Go to new password page
      navigate("/reset-password");

    } catch (err) {
      console.error("OTP verification error:", err);

      setError(
        err.message || "OTP verification failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          🎓 CampusHub
        </div>

        <h1>Verify OTP</h1>

        <p className="login-subtitle">
          Enter the 6-digit OTP sent to your email.
        </p>

        {email && (
          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {email}
          </p>
        )}

        <form onSubmit={handleVerifyOTP}>

          <div className="input-group">

            <label>
              Enter OTP
            </label>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => {
                const value =
                  e.target.value.replace(/\D/g, "");

                setOtp(value);
              }}
              required
            />

          </div>

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

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

        <p className="signup-text">

          Didn't receive OTP?{" "}

          <Link to="/forgot-password">
            Send Again
          </Link>

        </p>

      </div>

    </div>
  );
}

export default VerifyOTP;