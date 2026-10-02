import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Timetable from "./pages/Timetable";
import Assignments from "./pages/Assignments";
import StudentPlacements from "./pages/StudentPlacements";
import StudentEvents from "./pages/StudentEvents";
import Results from "./pages/Results";

import Settings from "./pages/Settings";

// ===============================
// TEACHER PAGES
// ===============================

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherResults from "./pages/TeacherResults";
import TeacherAttendance from "./pages/TeacherAttendance";

import DashboardLayout from "./layouts/DashboardLayout";
import TeacherDashboardLayout from "./layouts/TeacherDashboardLayout";

import { SettingsProvider } from "./SettingsContext";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";


function App() {
  return (
    <SettingsProvider>

      <BrowserRouter>

        <Routes>

          {/* ===============================
              PUBLIC PAGES (LANDING ROOT)
          =============================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* FORGOT PASSWORD */}

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          {/* VERIFY OTP */}

          <Route
            path="/verify-otp"
            element={
              <PublicRoute>
                <VerifyOTP />
              </PublicRoute>
            }
          />

          {/* RESET PASSWORD */}

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />


          {/* ===============================
              STUDENT DASHBOARD (PROTECTED)
          =============================== */}

          <Route
            element={<ProtectedRoute allowedRole="student" />}
          >
            <Route
              path="/dashboard"
              element={<DashboardLayout />}
            >

              <Route
                index
                element={<Dashboard />}
              />

              <Route
                path="attendance"
                element={<Attendance />}
              />

              <Route
                path="timetable"
                element={<Timetable />}
              />

              <Route
                path="assignments"
                element={<Assignments />}
              />

              <Route
                path="placements"
                element={<StudentPlacements />}
              />

              <Route
                path="events"
                element={<StudentEvents />}
              />

              <Route
                path="results"
                element={<Results />}
              />

              <Route
                path="settings"
                element={<Settings />}
              />

            </Route>
          </Route>


          {/* ===============================
              TEACHER DASHBOARD (PROTECTED)
          =============================== */}

          <Route
            element={<ProtectedRoute allowedRole="teacher" />}
          >
            <Route
              path="/teacher-dashboard"
              element={<TeacherDashboardLayout />}
            >

              <Route
                index
                element={<TeacherDashboard />}
              />

              <Route
                path="attendance"
                element={<TeacherAttendance />}
              />

              <Route
                path="timetable"
                element={<Timetable />}
              />

              <Route
                path="assignments"
                element={<Assignments />}
              />

              <Route
                path="results"
                element={<TeacherResults />}
              />

              <Route
                path="settings"
                element={<Settings />}
              />

            </Route>
          </Route>

          {/* CATCH ALL WILDCARD ROUTE */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </BrowserRouter>

    </SettingsProvider>
  );
}

export default App;