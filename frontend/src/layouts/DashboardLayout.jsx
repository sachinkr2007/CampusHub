import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSettings } from "../SettingsContext";

function DashboardLayout() {
  const { t } = useSettings();
  const location = useLocation();

  const [student, setStudent] = useState(() => {
    try {
      const stored = localStorage.getItem("student");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem("student");
        setStudent(stored ? JSON.parse(stored) : null);
      } catch {
        setStudent(null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const studentName =
    student?.name || student?.fullName || "Student";

  const studentInitial =
    studentName.charAt(0).toUpperCase();

  const currentPath = location.pathname;

  return (
    <div className="dashboard-page">

      <aside className="sidebar">

        <div className="sidebar-logo">
          🎓 CampusHub
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className={currentPath === "/dashboard" ? "active" : ""}
          >
            📊 {t.dashboard}
          </Link>

          <Link
            to="/dashboard/attendance"
            className={currentPath === "/dashboard/attendance" ? "active" : ""}
          >
            📚 {t.attendance}
          </Link>

          <Link
            to="/dashboard/timetable"
            className={currentPath === "/dashboard/timetable" ? "active" : ""}
          >
            🗓️ {t.timetable}
          </Link>

          <Link
            to="/dashboard/assignments"
            className={currentPath.startsWith("/dashboard/assignments") ? "active" : ""}
          >
            📝 {t.assignments}
          </Link>

          <Link
            to="/dashboard/placements"
            className={currentPath === "/dashboard/placements" ? "active" : ""}
          >
            💼 {t.placements}
          </Link>

          <Link
            to="/dashboard/events"
            className={currentPath === "/dashboard/events" ? "active" : ""}
          >
            📅 {t.events}
          </Link>

          <Link
            to="/dashboard/results"
            className={currentPath === "/dashboard/results" ? "active" : ""}
          >
            📊 {t.results}
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link
            to="/dashboard/settings"
            className={currentPath === "/dashboard/settings" ? "active" : ""}
          >
            ⚙️ {t.settings}
          </Link>

          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("student");
              localStorage.removeItem("role");
              localStorage.removeItem("token");
            }}
          >
            🚪 {t.logout}
          </Link>

        </div>

      </aside>


      <main className="dashboard-main">

        <header className="dashboard-topbar">

          <div>
            <p>{t.portal}</p>

            <h2>
              CampusHub
            </h2>
          </div>


          <div className="user-profile">

            <Link
              to="/dashboard/settings"
              style={{ textDecoration: "none", color: "inherit" }}
              title={t.settings}
            >
              <span>🔔</span>
            </Link>

            <Link
              to="/dashboard/settings"
              style={{ textDecoration: "none" }}
              title={studentName}
            >
              <div
                className="user-avatar"
                title={studentName}
              >
                {studentInitial}
              </div>
            </Link>

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