import { useEffect, useState } from "react";

function TeacherAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState("");

  // ===============================
  // FETCH STUDENTS
  // ===============================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/students"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      // Only students, not teachers
      const onlyStudents = Array.isArray(data)
        ? data.filter(
            (user) => user.role === "student"
          )
        : [];

      setStudents(onlyStudents);

    } catch (err) {
      console.error(
        "Fetch students error:",
        err
      );

      setError(
        "Unable to load students."
      );

    } finally {
      setLoading(false);
    }
  };


  // ===============================
  // LOAD STUDENTS
  // ===============================

  useEffect(() => {
    fetchStudents();
  }, []);


  // ===============================
  // MARK ATTENDANCE
  // ===============================

  const markAttendance = async (
    studentId,
    status
  ) => {
    try {
      setSaving((prev) => ({
        ...prev,
        [studentId]: true,
      }));

      const response = await fetch(
        "http://localhost:5000/api/attendance",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            student: studentId,

            date: new Date()
              .toISOString(),

            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to mark attendance"
        );
      }

      setAttendance((prev) => ({
        ...prev,
        [studentId]: status,
      }));

      alert(
        `Attendance marked ${status}`
      );

    } catch (err) {
      console.error(
        "Mark attendance error:",
        err
      );

      alert(
        err.message ||
          "Unable to mark attendance"
      );

    } finally {
      setSaving((prev) => ({
        ...prev,
        [studentId]: false,
      }));
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
            Teacher Portal
          </p>

          <h1>
            Student Attendance
          </h1>

          <p>
            Mark attendance for students
            using their roll numbers.
          </p>

        </div>

        <button
          className="today-btn"
          onClick={fetchStudents}
        >
          🔄 Refresh
        </button>

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
          Loading students...
        </div>
      )}


      {/* ===============================
          ERROR
      =============================== */}

      {!loading && error && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          <p>{error}</p>

          <button
            onClick={fetchStudents}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}


      {/* ===============================
          STUDENT LIST
      =============================== */}

      {!loading &&
        !error &&
        students.length > 0 && (

          <div className="students-section">

            <div className="students-heading">

              <div>

                <h2>
                  Students
                </h2>

                <p>
                  Mark today's attendance
                </p>

              </div>

              <span className="job-count">
                {students.length} Students
              </span>

            </div>


            <div className="student-list">

              {students.map((student) => (

                <div
                  className="student-card"
                  key={student._id}
                >

                  {/* STUDENT HEADER */}

                  <div className="student-card-header">

                    <div className="student-avatar">
                      {student.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <h3>
                        {student.name}
                      </h3>

                      <p>
                        Roll No:{" "}
                        <strong>
                          {student.rollNo}
                        </strong>
                      </p>

                    </div>

                  </div>


                  {/* STUDENT INFO */}

                  <div className="student-info">

                    <div className="info-item">

                      <span className="info-label">
                        Course
                      </span>

                      <span className="info-value">
                        {student.course}
                      </span>

                    </div>


                    <div className="info-item">

                      <span className="info-label">
                        Year
                      </span>

                      <span className="info-value">
                        {student.year}
                      </span>

                    </div>

                  </div>


                  {/* ATTENDANCE BUTTONS */}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >

                    <button
                      onClick={() =>
                        markAttendance(
                          student._id,
                          "Present"
                        )
                      }
                      disabled={
                        saving[student._id]
                      }
                      style={{
                        padding:
                          "10px 18px",
                        cursor:
                          "pointer",
                      }}
                    >
                      ✅ Present
                    </button>


                    <button
                      onClick={() =>
                        markAttendance(
                          student._id,
                          "Absent"
                        )
                      }
                      disabled={
                        saving[student._id]
                      }
                      style={{
                        padding:
                          "10px 18px",
                        cursor:
                          "pointer",
                      }}
                    >
                      ❌ Absent
                    </button>

                  </div>


                  {/* CURRENT STATUS */}

                  {attendance[
                    student._id
                  ] && (

                    <p
                      style={{
                        marginTop:
                          "12px",
                        fontWeight:
                          "600",
                      }}
                    >
                      Today's Status:{" "}
                      {
                        attendance[
                          student._id
                        ]
                      }
                    </p>

                  )}

                </div>

              ))}

            </div>

          </div>

        )}


      {/* ===============================
          NO STUDENTS
      =============================== */}

      {!loading &&
        !error &&
        students.length === 0 && (

          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >

            <h3>
              No students found
            </h3>

            <p>
              Add student accounts first.
            </p>

          </div>

        )}

    </div>
  );
}

export default TeacherAttendance;