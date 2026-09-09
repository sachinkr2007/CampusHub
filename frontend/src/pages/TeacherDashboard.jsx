import { Link } from "react-router-dom";

function TeacherDashboard() {
  const teacher = JSON.parse(
    localStorage.getItem("student") || "null"
  );

  const teacherName =
    teacher?.name || "Teacher";

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
            Welcome, {teacherName} 👋
          </h1>

          <p>
            Manage students and academic activities
            from your dashboard.
          </p>
        </div>

      </div>


      {/* ===============================
          QUICK ACTIONS
      =============================== */}

      <div className="dashboard-cards">

        {/* ATTENDANCE */}

        <Link
          to="/teacher-dashboard/attendance"
          className="dashboard-stat"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >

          <span>
            📚 Attendance
          </span>

          <h2>
            Manage
          </h2>

          <small>
            Mark and manage student attendance
          </small>

        </Link>


        {/* TIMETABLE */}

        <Link
          to="/teacher-dashboard/timetable"
          className="dashboard-stat"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >

          <span>
            🗓️ Timetable
          </span>

          <h2>
            Manage
          </h2>

          <small>
            Manage student timetable
          </small>

        </Link>


        {/* ASSIGNMENTS */}

        <Link
          to="/teacher-dashboard/assignments"
          className="dashboard-stat"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >

          <span>
            📝 Assignments
          </span>

          <h2>
            Manage
          </h2>

          <small>
            Create and manage assignments
          </small>

        </Link>


        {/* RESULTS */}

        <Link
          to="/teacher-dashboard/results"
          className="dashboard-stat"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >

          <span>
            📊 Results
          </span>

          <h2>
            Manage
          </h2>

          <small>
            Add and manage student results
          </small>

        </Link>

      </div>


      {/* ===============================
          TEACHER INFORMATION
      =============================== */}

      <div className="students-section">

        <div className="students-heading">

          <div>

            <h2>
              Teacher Information
            </h2>

            <p>
              Your CampusHub account
            </p>

          </div>

        </div>


        <div className="student-list">

          <div className="student-card">

            <div className="student-card-header">

              <div className="student-avatar">
                {teacherName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h3>
                  {teacherName}
                </h3>

                <p>
                  Teacher
                </p>

              </div>

            </div>


            <div className="student-info">

              <div className="info-item">

                <span className="info-label">
                  Email
                </span>

                <span className="info-value">
                  {teacher?.email || "-"}
                </span>

              </div>


              <div className="info-item">

                <span className="info-label">
                  Course
                </span>

                <span className="info-value">
                  {teacher?.course || "-"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TeacherDashboard;