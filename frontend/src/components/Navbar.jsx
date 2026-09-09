import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // ===============================
  // LOAD LOGGED-IN USER
  // ===============================

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("student");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      }
    };

    loadUser();

    // Update navbar when login/logout happens
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("role");

    setUser(null);
    setShowProfile(false);

    navigate("/login");
  };

  // ===============================
  // GET USER INITIAL
  // ===============================

  const getInitial = () => {
    if (!user) return "U";

    const name =
      user.name ||
      user.fullName ||
      user.username ||
      user.email ||
      "User";

    return name.charAt(0).toUpperCase();
  };

  // ===============================
  // GET USER NAME
  // ===============================

  const getUserName = () => {
    return (
      user?.name ||
      user?.fullName ||
      user?.username ||
      "User"
    );
  };

  return (
    <nav className="navbar">

      {/* ===============================
          LOGO
      =============================== */}

      <div className="logo">
        <span>🎓</span>
        CampusHub
      </div>


      {/* ===============================
          NAV LINKS
      =============================== */}

      <div className="nav-links">

        <a href="#home">
          Home
        </a>

        <a href="#features">
          Features
        </a>

        <a href="#placements">
          Placements
        </a>

        <a href="#events">
          Events
        </a>

      </div>


      {/* ===============================
          RIGHT SIDE
      =============================== */}

      {!user ? (

        // ===============================
        // NOT LOGGED IN
        // ===============================

        <Link
          to="/login"
          className="login-btn"
        >
          Login
        </Link>

      ) : (

        // ===============================
        // LOGGED IN USER
        // ===============================

        <div className="profile-container">

          <button
            className="profile-btn"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >

            <div className="profile-avatar">
              {getInitial()}
            </div>

            <span className="profile-name">
              {getUserName()}
            </span>

            <span className="profile-arrow">
              {showProfile ? "▲" : "▼"}
            </span>

          </button>


          {/* ===============================
              PROFILE DROPDOWN
          =============================== */}

          {showProfile && (

            <div className="profile-dropdown">

              <div className="profile-header">

                <div className="large-profile-avatar">
                  {getInitial()}
                </div>

                <div>
                  <h3>
                    {getUserName()}
                  </h3>

                  <p>
                    {user.email || "No email"}
                  </p>
                </div>

              </div>


              <div className="profile-divider"></div>


              {/* ROLE */}

              <div className="profile-info">

                <span>
                  Role
                </span>

                <strong>
                  {user.role || "Student"}
                </strong>

              </div>


              {/* COURSE */}

              {(user.course ||
                user.branch ||
                user.department) && (

                <div className="profile-info">

                  <span>
                    Course / Branch
                  </span>

                  <strong>
                    {user.course ||
                      user.branch ||
                      user.department}
                  </strong>

                </div>

              )}


              {/* ROLL NUMBER */}

              {(user.rollNumber ||
                user.rollNo ||
                user.enrollmentNumber ||
                user.enrollmentNo) && (

                <div className="profile-info">

                  <span>
                    Roll / Enrollment No.
                  </span>

                  <strong>
                    {user.rollNumber ||
                      user.rollNo ||
                      user.enrollmentNumber ||
                      user.enrollmentNo}
                  </strong>

                </div>

              )}


              {/* SEMESTER */}

              {(user.semester ||
                user.year) && (

                <div className="profile-info">

                  <span>
                    Semester / Year
                  </span>

                  <strong>
                    {user.semester ||
                      user.year}
                  </strong>

                </div>

              )}


              {/* DASHBOARD */}

              <Link
                to={
                  user.role === "teacher"
                    ? "/teacher-dashboard"
                    : "/dashboard"
                }
                className="profile-dashboard-btn"
                onClick={() =>
                  setShowProfile(false)
                }
              >
                Go to Dashboard
              </Link>


              {/* LOGOUT */}

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          )}

        </div>

      )}

    </nav>
  );
}

export default Navbar;