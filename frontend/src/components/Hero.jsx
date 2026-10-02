import { Link } from "react-router-dom";

function Hero() {
  const user = JSON.parse(localStorage.getItem("student") || "null");
  const dashboardLink = user?.role === "teacher" ? "/teacher-dashboard" : "/dashboard";

  return (
    <section className="hero" id="home">

      <div className="hero-content">

        {/* Left Side */}

        <div className="hero-text">

          <p className="hero-tag">
            SMART COLLEGE PLATFORM
          </p>

          <h1>
            Your Smart College Life,
            <span> All in One Place.</span>
          </h1>

          <p className="hero-description">
            Manage academics, attendance, events,
            placements and college activities
            from one powerful platform.
          </p>

          <div className="hero-buttons">

            <Link
              to={user ? dashboardLink : "/register"}
              className="primary-btn"
              style={{ textDecoration: "none", textAlign: "center", display: "inline-block" }}
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </Link>

            <a
              href="#features"
              className="secondary-btn"
              style={{ textDecoration: "none", textAlign: "center", display: "inline-block" }}
            >
              Explore Features
            </a>

          </div>

        </div>


        {/* Right Side */}

        <div className="hero-dashboard">

          <div className="dashboard-card">

            <div className="dashboard-header">
              <div>
                <p>Campus Portal Preview</p>
                <h3>Good Morning 👋</h3>
              </div>

              <div className="profile-circle">
                🎓
              </div>
            </div>


            <div className="dashboard-stats">

              <div className="mini-card">
                <span>Attendance</span>
                <strong>92%</strong>
              </div>

              <div className="mini-card">
                <span>Assignments</span>
                <strong>04</strong>
              </div>

            </div>


            <div className="dashboard-progress">

              <div className="progress-title">
                <span>Academic Progress</span>
                <span>78%</span>
              </div>

              <div className="progress-bar">
                <div></div>
              </div>

            </div>


            <div className="dashboard-event">

              <div>
                <span>Upcoming Event</span>
                <h4>AI & ML Workshop</h4>
              </div>

              <strong>24 AUG</strong>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;