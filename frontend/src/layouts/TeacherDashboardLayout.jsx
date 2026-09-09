import { Link, Outlet } from "react-router-dom";

function TeacherDashboardLayout() {
  const teacher = JSON.parse(
    localStorage.getItem("student") || "null"
  );

  const teacherName =
    teacher?.name || "Teacher";

  const teacherInitial =
    teacherName.charAt(0).toUpperCase();

  return (
    <div className="dashboard-page">

      {/* ===============================
          SIDEBAR
      =============================== */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          🎓 CampusHub
        </div>

        <nav className="sidebar-nav">

          <Link to="/teacher-dashboard">
            📊 Dashboard
          </Link>

          <Link to="/teacher-dashboard/attendance">
            📚 Attendance
          </Link>

          <Link to="/teacher-dashboard/timetable">
            🗓️ Timetable
          </Link>

          <Link to="/teacher-dashboard/assignments">
            📝 Assignments
          </Link>

          <Link to="/teacher-dashboard/results">
            📊 Results
          </Link>

        </nav>


        {/* ===============================
            BOTTOM
        =============================== */}

        <div className="sidebar-bottom">

          <Link to="/teacher-dashboard/settings">
            ⚙️ Settings
          </Link>

          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("student");
              localStorage.removeItem("role");
            }}
          >
            🚪 Logout
          </Link>

        </div>

      </aside>


      {/* ===============================
          MAIN
      =============================== */}

      <main className="dashboard-main">

        <header className="dashboard-topbar">

          <div>

            <p>
              Teacher Portal
            </p>

            <h2>
              CampusHub
            </h2>

          </div>


          <div className="user-profile">

            <span>
              🔔
            </span>

            <div
              className="user-avatar"
              title={teacherName}
            >
              {teacherInitial}
            </div>

          </div>

        </header>


        {/* ===============================
            PAGE CONTENT
        =============================== */}

        <div className="dashboard-content">

          <Outlet />

        </div>

      </main>

    </div>
  );
}

export default TeacherDashboardLayout;