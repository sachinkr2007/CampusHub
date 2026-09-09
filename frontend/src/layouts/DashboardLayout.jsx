import { Link, Outlet } from "react-router-dom";

function DashboardLayout() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const studentName =
    student?.name || "Student";

  const studentInitial =
    studentName.charAt(0).toUpperCase();

  return (
    <div className="dashboard-page">

      <aside className="sidebar">

        <div className="sidebar-logo">
          🎓 CampusHub
        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard">
            📊 Dashboard
          </Link>

          <Link to="/dashboard/attendance">
            📚 Attendance
          </Link>

          <Link to="/dashboard/timetable">
            🗓️ Timetable
          </Link>

          <Link to="/dashboard/assignments">
            📝 Assignments
          </Link>

          <Link to="/dashboard/placements">
            💼 Placements
          </Link>

          <Link to="/dashboard/events">
            📅 Events
          </Link>

          <Link to="/dashboard/results">
            📊 Results
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link to="/dashboard/settings">
            ⚙️ Settings
          </Link>

          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("student");
            }}
          >
            🚪 Logout
          </Link>

        </div>

      </aside>


      <main className="dashboard-main">

        <header className="dashboard-topbar">

          <div>
            <p>Student Portal</p>

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
              title={studentName}
            >
              {studentInitial}
            </div>

          </div>

        </header>


        <div className="dashboard-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;