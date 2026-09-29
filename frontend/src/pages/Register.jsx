import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // HANDLE INPUT
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ===============================
  // HANDLE REGISTER
  // ===============================

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // PASSWORD CHECK
      if (
        formData.password !==
        formData.confirmPassword
      ) {
        setError(
          "Passwords do not match."
        );

        setLoading(false);
        return;
      }

      // ===============================
      // REGISTER API
      // ===============================

      const response = await fetch(
        `${API_BASE_URL}/students`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),

            email:
              formData.email
                .trim()
                .toLowerCase(),

            password:
              formData.password,

            course:
              formData.role === "teacher"
                ? "Faculty"
                : "B.Tech AIML",

            year:
              formData.role === "teacher"
                ? 0
                : 2,

            skills: [],

            role:
              formData.role,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Registration failed"
        );
      }

      alert(
        "Account created successfully! 🎉"
      );

      navigate("/login");

    } catch (err) {
      console.error(
        "Registration error:",
        err
      );

      setError(
        err.message ||
          "Unable to create account."
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

        <h1>
          Create Account
        </h1>

        <p className="login-subtitle">
          Create your CampusHub account
        </p>


        <form
          onSubmit={handleRegister}
        >

          {/* NAME */}

          <div className="input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* ROLE */}

          <div className="input-group">

            <label>
              Account Type
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >

              <option value="student">
                Student
              </option>

              <option value="teacher">
                Teacher
              </option>

            </select>

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
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
              name="confirmPassword"
              placeholder="Confirm your password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              required
            />

          </div>


          {/* ERROR */}

          {error && (

            <p
              style={{
                color: "red",
                marginBottom:
                  "10px",
              }}
            >
              {error}
            </p>

          )}


          {/* SUBMIT */}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* LOGIN */}

        <p className="signup-text">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;