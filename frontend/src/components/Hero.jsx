function Hero() {
  return (
    <section className="hero">

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

            <button className="primary-btn">
              Get Started
            </button>

            <button className="secondary-btn">
              Explore Features
            </button>

          </div>

        </div>


        {/* Right Side */}

        <div className="hero-dashboard">

          <div className="dashboard-card">

            <div className="dashboard-header">
              <div>
                <p>Student Dashboard</p>
                <h3>Good Morning 👋</h3>
              </div>

              <div className="profile-circle">
                S
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