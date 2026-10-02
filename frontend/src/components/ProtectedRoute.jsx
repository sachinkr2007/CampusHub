import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute: Ensures user is authenticated and has required role.
 * - If user is not logged in, redirect to /login
 * - If student tries to access teacher route, redirect to /dashboard
 * - If teacher tries to access student route, redirect to /teacher-dashboard
 */
export function ProtectedRoute({ allowedRole }) {
  let user = null;
  try {
    const stored = localStorage.getItem("student");
    if (stored) {
      user = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Auth check error:", err);
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role || localStorage.getItem("role") || "student";

  if (allowedRole && allowedRole !== role) {
    if (role === "teacher") {
      return <Navigate to="/teacher-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}

/**
 * PublicRoute: For auth routes like /login, /register, /forgot-password
 * - If user is already logged in, redirect to their dashboard
 * - If user is not logged in, render child components
 */
export function PublicRoute({ children }) {
  let user = null;
  try {
    const stored = localStorage.getItem("student");
    if (stored) {
      user = JSON.parse(stored);
    }
  } catch (err) {
    user = null;
  }

  if (user) {
    const role = user.role || localStorage.getItem("role") || "student";
    return <Navigate to={role === "teacher" ? "/teacher-dashboard" : "/dashboard"} replace />;
  }

  return children;
}

export default ProtectedRoute;
