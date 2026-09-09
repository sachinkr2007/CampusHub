function Placements() {
  return (
    <section className="placements">

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

          <button>
            View Details
          </button>

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

          <button>
            View Details
          </button>

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

          <button>
            View Details
          </button>

        </div>

      </div>


      <div className="placement-action">
        <button>
          View All Opportunities →
        </button>
      </div>

    </section>
  );
}

export default Placements;