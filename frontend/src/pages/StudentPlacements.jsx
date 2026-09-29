import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";

function StudentPlacements() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // APPLICATION STATES
  // ===============================

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
  });

  const [submitting, setSubmitting] =
    useState(false);


  // ===============================
  // FETCH PLACEMENTS
  // ===============================

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/placements`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch placements"
        );
      }

      const data =
        await response.json();

      setJobs(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.error(
        "Placement fetch error:",
        err
      );

      setError(
        "Unable to load placement opportunities."
      );

    } finally {
      setLoading(false);
    }
  };


  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {
    fetchPlacements();
  }, []);


  // ===============================
  // OPEN APPLICATION FORM
  // ===============================

  const handleApply = (job) => {
    setSelectedJob(job);

    // Get logged-in student
    const storedStudent =
      localStorage.getItem("student");

    let loggedInStudent = null;

    if (storedStudent) {
      try {
        loggedInStudent =
          JSON.parse(storedStudent);
      } catch (err) {
        console.error(
          "Invalid student data:",
          err
        );
      }
    }

    setFormData({
      studentName:
        loggedInStudent?.name || "",

      email:
        loggedInStudent?.email || "",

      phone: "",
    });
  };


  // ===============================
  // CLOSE APPLICATION FORM
  // ===============================

  const closeApplicationForm = () => {
    setSelectedJob(null);

    setFormData({
      studentName: "",
      email: "",
      phone: "",
    });
  };


  // ===============================
  // HANDLE INPUT
  // ===============================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ===============================
  // SUBMIT APPLICATION
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.email ||
      !formData.phone
    ) {
      alert(
        "Please fill all fields."
      );

      return;
    }

    try {
      setSubmitting(true);

      const response =
        await fetch(
          `${API_BASE_URL}/applications`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              studentName:
                formData.studentName,

              email:
                formData.email,

              phone:
                formData.phone,

              company:
                selectedJob.company,

              role:
                selectedJob.role,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to submit application"
        );
      }

      alert(
        "Application submitted successfully! 🎉"
      );

      closeApplicationForm();

    } catch (err) {
      console.error(
        "Application submit error:",
        err
      );

      alert(
        err.message ||
          "Unable to submit application."
      );

    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="module-page">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="module-header">

        <div>

          <p>
            Student Portal
          </p>

          <h1>
            Placement Opportunities
          </h1>

        </div>

        <span className="job-count">
          {jobs.length} Opportunities
        </span>

      </div>


      {/* ===============================
          LOADING
      =============================== */}

      {loading && (

        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          Loading placement opportunities...
        </div>

      )}


      {/* ===============================
          ERROR
      =============================== */}

      {!loading &&
        error && (

          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >

            <p>
              {error}
            </p>

            <button
              onClick={
                fetchPlacements
              }
              style={{
                marginTop:
                  "10px",
                padding:
                  "8px 16px",
                cursor:
                  "pointer",
              }}
            >
              Try Again
            </button>

          </div>

        )}


      {/* ===============================
          NO JOBS
      =============================== */}

      {!loading &&
        !error &&
        jobs.length === 0 && (

          <div
            style={{
              padding: "40px",
              textAlign:
                "center",
            }}
          >

            <h3>
              No placement opportunities found
            </h3>

            <p>
              There are currently no
              placement opportunities
              available.
            </p>

          </div>

        )}


      {/* ===============================
          JOB LIST
      =============================== */}

      {!loading &&
        !error &&
        jobs.length > 0 && (

          <div className="student-job-list">

            {jobs.map((job) => (

              <div
                className="student-job-card"
                key={job._id}
              >

                {/* COMPANY LOGO */}

                <div className="company-logo-large">

                  {job.company
                    ? job.company
                        .slice(0, 3)
                        .toUpperCase()
                    : "JOB"}

                </div>


                {/* JOB INFORMATION */}

                <div className="student-job-info">

                  <span>
                    {job.type}
                  </span>

                  <h3>
                    {job.role}
                  </h3>

                  <p>
                    {job.company}
                  </p>

                  <div className="job-meta">

                    <span>
                      📍{" "}
                      {job.location}
                    </span>

                    <span>
                      💰{" "}
                      {job.package}
                    </span>

                  </div>

                  <small>
                    Eligibility:{" "}
                    {job.eligibility}
                  </small>

                </div>


                {/* APPLY BUTTON */}

                <button
                  className="apply-btn"
                  onClick={() =>
                    handleApply(job)
                  }
                >
                  Apply Now
                </button>

              </div>

            ))}

          </div>

        )}


      {/* ===============================
          APPLICATION MODAL
      =============================== */}

      {selectedJob && (

        <div
          onClick={
            closeApplicationForm
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "500px",
              borderRadius:
                "16px",
              padding: "28px",
              boxSizing:
                "border-box",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-start",
                marginBottom:
                  "20px",
              }}
            >

              <div>

                <p
                  style={{
                    margin:
                      "0 0 5px",
                    color:
                      "#2563eb",
                    fontSize:
                      "14px",
                    fontWeight:
                      "600",
                  }}
                >
                  Apply for
                </p>

                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      "24px",
                  }}
                >
                  {selectedJob.role}
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 0",
                    color:
                      "#64748b",
                  }}
                >
                  {selectedJob.company}
                </p>

              </div>

              <button
                type="button"
                onClick={
                  closeApplicationForm
                }
                style={{
                  border:
                    "none",
                  background:
                    "transparent",
                  fontSize:
                    "28px",
                  cursor:
                    "pointer",
                  color:
                    "#64748b",
                }}
              >
                ×
              </button>

            </div>


            {/* APPLICATION FORM */}

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* NAME */}

              <div
                style={{
                  marginBottom:
                    "16px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  value={
                    formData.studentName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your name"
                  required
                  readOnly
                  style={{
                    width:
                      "100%",
                    padding:
                      "12px",
                    border:
                      "1px solid #dbe3ef",
                    borderRadius:
                      "8px",
                    boxSizing:
                      "border-box",
                    fontSize:
                      "14px",
                    background:
                      "#f8fafc",
                  }}
                />

              </div>


              {/* EMAIL */}

              <div
                style={{
                  marginBottom:
                    "16px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  required
                  readOnly
                  style={{
                    width:
                      "100%",
                    padding:
                      "12px",
                    border:
                      "1px solid #dbe3ef",
                    borderRadius:
                      "8px",
                    boxSizing:
                      "border-box",
                    fontSize:
                      "14px",
                    background:
                      "#f8fafc",
                  }}
                />

              </div>


              {/* PHONE */}

              <div
                style={{
                  marginBottom:
                    "20px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your phone number"
                  required
                  style={{
                    width:
                      "100%",
                    padding:
                      "12px",
                    border:
                      "1px solid #dbe3ef",
                    borderRadius:
                      "8px",
                    boxSizing:
                      "border-box",
                    fontSize:
                      "14px",
                  }}
                />

              </div>


              {/* BUTTONS */}

              <div
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  justifyContent:
                    "flex-end",
                }}
              >

                <button
                  type="button"
                  onClick={
                    closeApplicationForm
                  }
                  style={{
                    padding:
                      "11px 18px",
                    border:
                      "1px solid #dbe3ef",
                    background:
                      "#fff",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    submitting
                  }
                  style={{
                    padding:
                      "11px 20px",
                    border:
                      "none",
                    background:
                      "#2563eb",
                    color:
                      "#fff",
                    borderRadius:
                      "8px",
                    cursor:
                      submitting
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      submitting
                        ? 0.7
                        : 1,
                  }}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default StudentPlacements;