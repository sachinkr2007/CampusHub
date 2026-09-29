import { Link } from "react-router-dom";

function Features() {
  const user = JSON.parse(localStorage.getItem("student") || "null");
  const isTeacher = user?.role === "teacher";

  return (
    <section className="features" id="features">

      <div className="section-heading">

        <p className="section-tag">
          POWERFUL FEATURES
        </p>

        <h2>
          Everything You Need
        </h2>

        <p>
          One platform to manage your complete
          college experience.
        </p>

      </div>


      <div className="feature-container">

        <Link
          to={user ? (isTeacher ? "/teacher-dashboard/attendance" : "/dashboard/attendance") : "/login"}
          className="feature-card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="feature-icon">📚</div>

          <h3>Academics</h3>

          <p>
            Manage your timetable, assignments,
            exams and attendance from one place.
          </p>

          <span>Explore Academics →</span>
        </Link>


        <Link
          to={user ? (isTeacher ? "/teacher-dashboard" : "/dashboard/placements") : "/login"}
          className="feature-card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="feature-icon">💼</div>

          <h3>Placements</h3>

          <p>
            Discover internships, job opportunities
            and upcoming placement drives.
          </p>

          <span>Explore Placements →</span>
        </Link>


        <Link
          to={user ? (isTeacher ? "/teacher-dashboard" : "/dashboard/events") : "/login"}
          className="feature-card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="feature-icon">📅</div>

          <h3>Events & Clubs</h3>

          <p>
            Discover college events, workshops
            and join your favourite clubs.
          </p>

          <span>Explore Events →</span>
        </Link>


        <Link
          to={user ? (isTeacher ? "/teacher-dashboard/results" : "/dashboard/results") : "/login"}
          className="feature-card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="feature-icon">📊</div>

          <h3>Analytics</h3>

          <p>
            Track attendance and academic
            performance through smart analytics.
          </p>

          <span>View Analytics →</span>
        </Link>

      </div>

    </section>
  );
}

export default Features;