import { Link } from "react-router-dom";

function Placements() {
  const user = JSON.parse(localStorage.getItem("student") || "null");
  const targetLink = user ? (user.role === "teacher" ? "/teacher-dashboard" : "/dashboard/placements") : "/login";

  return (
    <section className="placements" id="placements">

      <div className="section-heading">

        <p className="section-tag">
          CAREER OPPORTUNITIES
        </p>

        <h2>
          Find Your Next Opportunity
        </h2>

        <p>
          Discover internships, jobs and placement
          drives from top companies.
        </p>

      </div>


      <div className="placement-container">

        <div className="placement-card">

          <div className="company-logo">
            TCS
          </div>

          <div className="placement-info">

            <span className="job-type">
              Full Time
            </span>

            <h3>
              Software Developer
            </h3>

            <p>
              Tata Consultancy Services
            </p>

            <div className="job-details">
              <span>📍 India</span>
              <span>💰 6-8 LPA</span>
            </div>

          </div>

          <Link
            to={targetLink}
            style={{ textDecoration: "none" }}
          >
            <button style={{ width: "100%" }}>
              View Details
            </button>
          </Link>

        </div>


        <div className="placement-card">

          <div className="company-logo">
            INF
          </div>

          <div className="placement-info">

            <span className="job-type">
              Internship
            </span>

            <h3>
              Frontend Developer Intern
            </h3>

            <p>
              Infosys
            </p>

            <div className="job-details">
              <span>📍 Pune</span>
              <span>💰 ₹20K/month</span>
            </div>

          </div>

          <Link
            to={targetLink}
            style={{ textDecoration: "none" }}
          >
            <button style={{ width: "100%" }}>
              View Details
            </button>
          </Link>

        </div>


        <div className="placement-card">

          <div className="company-logo">
            WIP
          </div>

          <div className="placement-info">

            <span className="job-type">
              Full Time
            </span>

            <h3>
              Data Analyst
            </h3>

            <p>
              Wipro
            </p>

            <div className="job-details">
              <span>📍 Bengaluru</span>
              <span>💰 5-7 LPA</span>
            </div>

          </div>

          <Link
            to={targetLink}
            style={{ textDecoration: "none" }}
          >
            <button style={{ width: "100%" }}>
              View Details
            </button>
          </Link>

        </div>

      </div>


      <div className="placement-action">
        <Link
          to={targetLink}
          style={{ textDecoration: "none" }}
        >
          <button>
            View All Opportunities →
          </button>
        </Link>
      </div>

    </section>
  );
}

export default Placements;