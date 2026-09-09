function Events() {
  return (
    <section className="events">

      <div className="section-heading">

        <p className="section-tag">
          CAMPUS ACTIVITIES
        </p>

        <h2>
          What's Happening on Campus?
        </h2>

        <p>
          Discover workshops, competitions and
          events happening around your campus.
        </p>

      </div>


      <div className="event-container">

        <div className="event-card">

          <div className="event-date">
            <strong>24</strong>
            <span>AUG</span>
          </div>

          <div className="event-info">

            <span>WORKSHOP</span>

            <h3>
              AI & Machine Learning Workshop
            </h3>

            <p>
              Learn the fundamentals of AI and
              build your first ML project.
            </p>

            <small>
              📍 Seminar Hall • 10:00 AM
            </small>

          </div>

          <button>
            Register
          </button>

        </div>


        <div className="event-card">

          <div className="event-date">
            <strong>28</strong>
            <span>AUG</span>
          </div>

          <div className="event-info">

            <span>COMPETITION</span>

            <h3>
              CodeSprint 2026
            </h3>

            <p>
              Test your coding skills and compete
              with students across the campus.
            </p>

            <small>
              📍 Computer Lab • 2:00 PM
            </small>

          </div>

          <button>
            Register
          </button>

        </div>


        <div className="event-card">

          <div className="event-date">
            <strong>02</strong>
            <span>SEP</span>
          </div>

          <div className="event-info">

            <span>TECH EVENT</span>

            <h3>
              Innovation & Startup Meet
            </h3>

            <p>
              Meet innovators and learn how to
              turn your ideas into real products.
            </p>

            <small>
              📍 Auditorium • 11:00 AM
            </small>

          </div>

          <button>
            Register
          </button>

        </div>

      </div>

    </section>
  );
}

export default Events;