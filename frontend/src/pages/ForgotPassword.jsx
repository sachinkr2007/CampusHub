import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/students/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      const data = await response.json();

      console.log("Forgot Password Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to send OTP"
        );
      }

      // ==================================
      // SAVE EMAIL FOR OTP VERIFICATION
      // ==================================

      localStorage.setItem(
        "resetEmail",
        cleanEmail
      );

      // ==================================
      // SUCCESS MESSAGE
      // ==================================

      setSuccess(
        data.message ||
          "OTP sent successfully to your email."
      );

      // ==================================
      // GO TO OTP PAGE
      // ==================================

      setTimeout(() => {
        navigate("/verify-otp");
      }, 800);

    } catch (err) {
      console.error(
        "Forgot Password Error:",
        err
      );

      setError(
        err.message ||
          "Failed to send OTP"
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
          Forgot Password?
        </h1>

        <p className="login-subtitle">
          Enter your registered email to receive an OTP.
        </p>


        <form onSubmit={handleSendOTP}>

          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
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


          {/* SEND OTP */}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>

        </form>


        {/* BACK TO LOGIN */}

        <p className="signup-text">

          <Link to="/login">
            ← Back to Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;