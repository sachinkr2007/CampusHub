import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSettings } from "../SettingsContext";

function TeacherDashboardLayout() {
  const { t } = useSettings();
  const location = useLocation();

  const [teacher, setTeacher] = useState(() => {
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
        setTeacher(stored ? JSON.parse(stored) : null);
      } catch {
        setTeacher(null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const teacherName =
    teacher?.name || teacher?.fullName || "Teacher";

  const teacherInitial =
    teacherName.charAt(0).toUpperCase();

  const currentPath = location.pathname;

  return (
    <div className="dashboard-page">

      <aside className="sidebar">

        <div className="sidebar-logo">
          🎓 CampusHub
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/teacher-dashboard"
            className={currentPath === "/teacher-dashboard" ? "active" : ""}
          >
            📊 {t.dashboard}
          </Link>

          <Link
            to="/teacher-dashboard/attendance"
            className={currentPath === "/teacher-dashboard/attendance" ? "active" : ""}
          >
            📚 {t.attendance}
          </Link>

          <Link
            to="/teacher-dashboard/timetable"
            className={currentPath === "/teacher-dashboard/timetable" ? "active" : ""}
          >
            🗓️ {t.timetable}
          </Link>

          <Link
            to="/teacher-dashboard/assignments"
            className={currentPath.startsWith("/teacher-dashboard/assignments") ? "active" : ""}
          >
            📝 {t.assignments}
          </Link>

          <Link
            to="/teacher-dashboard/results"
            className={currentPath === "/teacher-dashboard/results" ? "active" : ""}
          >
            📊 {t.results}
          </Link>

        </nav>


        <div className="sidebar-bottom">

          <Link
            to="/teacher-dashboard/settings"
            className={currentPath === "/teacher-dashboard/settings" ? "active" : ""}
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
            <p>
              {t.teacherPortal}
            </p>

            <h2>
              CampusHub
            </h2>
          </div>


          <div className="user-profile">

            <Link
              to="/teacher-dashboard/settings"
              style={{ textDecoration: "none", color: "inherit" }}
              title={t.settings}
            >
              <span>🔔</span>
            </Link>

            <Link
              to="/teacher-dashboard/settings"
              style={{ textDecoration: "none" }}
              title={teacherName}
            >
              <div
                className="user-avatar"
                title={teacherName}
              >
                {teacherInitial}
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

export default TeacherDashboardLayout;