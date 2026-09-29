import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/students/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password: password,
            role: role,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Login failed"
        );
      }

      // ===============================
      // USER DATA
      // ===============================

      const loggedInUser =
        data.user || data.student;

      if (!loggedInUser) {
        throw new Error(
          "User data not received from server"
        );
      }

      // ===============================
      // SAVE USER
      // ===============================

      localStorage.setItem(
        "student",
        JSON.stringify(loggedInUser)
      );

      // ===============================
      // SAVE ROLE
      // ===============================

      localStorage.setItem(
        "role",
        loggedInUser.role || role
      );

      // ===============================
      // SAVE JWT TOKEN
      // ===============================

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      // ===============================
      // REDIRECT
      // ===============================

      if (loggedInUser.role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Login failed"
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
        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your CampusHub account
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div
            style={{
              textAlign: "right",
              marginBottom: "15px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: "#4285f4",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* ROLE */}
          <div className="input-group">
            <label>Login As</label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option value="student">
                Student
              </option>

              <option value="teacher">
                Teacher
              </option>
            </select>
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

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* CREATE ACCOUNT */}
        <p className="signup-text">
          Don't have an account?

          <Link to="/register">
            {" "}Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;