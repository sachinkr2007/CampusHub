import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH LOGGED-IN STUDENT RESULTS
  // =========================

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError("");

      // Get logged-in student
      const storedStudent =
        localStorage.getItem("student");

      if (!storedStudent) {
        throw new Error(
          "Student login information not found."
        );
      }

      const student =
        JSON.parse(storedStudent);

      if (!student?._id) {
        throw new Error(
          "Student ID not found. Please login again."
        );
      }

      // Fetch only this student's results
      const response = await fetch(
        `${API_BASE_URL}/results/student/${student._id}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch student results"
        );
      }

      const data = await response.json();

      setResults(
        Array.isArray(data) ? data : []
      );

    } catch (err) {
      console.error(
        "Result fetch error:",
        err
      );

      setError(
        err.message ||
        "Unable to load results."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // LOAD RESULTS
  // =========================

  useEffect(() => {
    fetchResults();
  }, []);


  // =========================
  // TOTAL MARKS
  // =========================

  const totalMarks = results.reduce(
    (total, result) =>
      total +
      Number(result.marks || 0),
    0
  );


  const totalPossibleMarks =
    results.reduce(
      (total, result) =>
        total +
        Number(result.totalMarks || 0),
      0
    );


  // =========================
  // PERCENTAGE
  // =========================

  const percentage =
    totalPossibleMarks > 0
      ? Math.round(
          (totalMarks /
            totalPossibleMarks) *
            100
        )
      : 0;


  // =========================
  // LOGGED-IN STUDENT
  // =========================

  const storedStudent =
    localStorage.getItem("student");

  const student = storedStudent
    ? JSON.parse(storedStudent)
    : null;


  return (
    <div className="module-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="module-header">

        <div>

          <p>
            Student Portal
          </p>

          <h1>
            Academic Results
          </h1>

        </div>

        <span className="job-count">
          {results.length} Subjects
        </span>

      </div>


      {/* =========================
          STUDENT INFORMATION
      ========================= */}

      {!loading &&
        !error &&
        student && (

          <div
            style={{
              marginBottom: "20px",
              padding: "18px",
              borderRadius: "12px"
            }}
          >

            <strong>
              Student: {student.name}
            </strong>

            <br />

            <span>
              {student.email}
            </span>

          </div>

        )}


      {/* =========================
          SUMMARY
      ========================= */}

      {!loading &&
        !error &&
        results.length > 0 && (

          <div className="dashboard-cards">

            <div className="dashboard-stat">

              <span>
                Total Marks
              </span>

              <h2>
                {totalMarks}
              </h2>

              <small>
                Out of {totalPossibleMarks}
              </small>

            </div>


            <div className="dashboard-stat">

              <span>
                Percentage
              </span>

              <h2>
                {percentage}%
              </h2>

              <small>
                Overall performance
              </small>

            </div>


            <div className="dashboard-stat">

              <span>
                Subjects
              </span>

              <h2>
                {results.length}
              </h2>

              <small>
                Semester results
              </small>

            </div>

          </div>

        )}


      {/* =========================
          LOADING
      ========================= */}

      {loading && (

        <div
          style={{
            padding: "40px",
            textAlign: "center"
          }}
        >
          Loading your results...
        </div>

      )}


      {/* =========================
          ERROR
      ========================= */}

      {!loading &&
        error && (

          <div
            style={{
              padding: "40px",
              textAlign: "center"
            }}
          >

            <p>
              {error}
            </p>

            <button
              onClick={fetchResults}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>

          </div>

        )}


      {/* =========================
          NO RESULTS
      ========================= */}

      {!loading &&
        !error &&
        results.length === 0 && (

          <div
            style={{
              padding: "40px",
              textAlign: "center"
            }}
          >

            <h3>
              No results found
            </h3>

            <p>
              No academic results are available
              for your account.
            </p>

          </div>

        )}


      {/* =========================
          RESULTS LIST
      ========================= */}

      {!loading &&
        !error &&
        results.length > 0 && (

          <div className="students-section">

            <div className="students-heading">

              <div>

                <h2>
                  My Subject Results
                </h2>

                <p>
                  Your academic performance
                  from database
                </p>

              </div>

            </div>


            <div className="student-list">

              {results.map(
                (result) => (

                  <div
                    className="student-card"
                    key={result._id}
                  >

                    {/* RESULT HEADER */}

                    <div className="student-card-header">

                      <div className="student-avatar">

                        {result.subject
                          ? result.subject
                              .charAt(0)
                              .toUpperCase()
                          : "R"}

                      </div>


                      <div>

                        <h3>
                          {result.subject}
                        </h3>

                        <p>
                          Semester{" "}
                          {result.semester}
                        </p>

                      </div>

                    </div>


                    {/* RESULT INFORMATION */}

                    <div className="student-info">

                      <div className="info-item">

                        <span className="info-label">
                          Marks
                        </span>

                        <span className="info-value">
                          {result.marks} /{" "}
                          {result.totalMarks}
                        </span>

                      </div>


                      <div className="info-item">

                        <span className="info-label">
                          Grade
                        </span>

                        <span className="info-value">
                          {result.grade || "-"}
                        </span>

                      </div>

                    </div>


                    {/* STUDENT */}

                    <div className="student-skills">

                      <span className="info-label">
                        Student
                      </span>

                      <div className="skills-list">

                        <span className="skill-badge">
                          {student?.name ||
                            "Student"}
                        </span>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

    </div>
  );
}

export default Results;