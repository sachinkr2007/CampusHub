import { Link } from "react-router-dom";

function CTA() {
  const user = JSON.parse(localStorage.getItem("student") || "null");
  const targetLink = user ? (user.role === "teacher" ? "/teacher-dashboard" : "/dashboard") : "/register";

  return (
    <section className="cta">

      <div className="cta-content">

        <p className="section-tag">
          START YOUR JOURNEY
        </p>

        <h2>
          Make Your College Life Smarter
        </h2>

        <p>
          Manage academics, discover opportunities
          and stay connected with your campus.
        </p>

        <Link
          to={targetLink}
          style={{ textDecoration: "none" }}
        >
          <button>
            {user ? "Go to Dashboard →" : "Get Started →"}
          </button>
        </Link>

      </div>

    </section>
  );
}

export default CTA;