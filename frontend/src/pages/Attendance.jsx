import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";

function Attendance() {
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    student: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
  });

  // ===============================
  // GET LOGGED-IN USER
  // ===============================

  const getUser = () => {
    const storedUser = localStorage.getItem("student");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      return null;
    }
  };

  // ===============================
  // CHECK TEACHER
  // ===============================

  const isTeacher = user?.role === "teacher";

  // ===============================
  // FETCH ONLY STUDENTS
  // ===============================

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/students`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      // IMPORTANT:
      // Teacher ko students list me nahi dikhana
      const onlyStudents = Array.isArray(data)
        ? data.filter((item) => item.role === "student")
        : [];

      setStudents(onlyStudents);

      // First student automatically select
      if (onlyStudents.length > 0) {
        setFormData((prev) => ({
          ...prev,
          student:
            prev.student || onlyStudents[0]._id,
        }));
      }
    } catch (error) {
      console.error("Student fetch error:", error);

      setMessage("Unable to load students.");
    }
  };

  // ===============================
  // FETCH ATTENDANCE
  // ===============================

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setMessage("");

      const loggedInUser = getUser();

      if (!loggedInUser) {
        setAttendance([]);
        setMessage("Please login first.");
        return;
      }

      setUser(loggedInUser);

      let url;

      // ===============================
      // TEACHER
      // ===============================

      if (loggedInUser.role === "teacher") {
        url =
          `${API_BASE_URL}/attendance`;
      }

      // ===============================
      // STUDENT
      // ===============================

      else {
        if (!loggedInUser._id) {
          setAttendance([]);
          setMessage("Student ID not found.");
          return;
        }

        url =
          `${API_BASE_URL}/attendance/student/${loggedInUser._id}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }

      const data = await response.json();

      setAttendance(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Attendance fetch error:",
        error
      );

      setAttendance([]);
      setMessage("Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // INITIAL LOAD
  // ===============================

  useEffect(() => {
    const loggedInUser = getUser();

    setUser(loggedInUser);

    if (loggedInUser?.role === "teacher") {
      fetchStudents();
    }

    fetchAttendance();
  }, []);

  // ===============================
  // HANDLE FORM CHANGE
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // RESET FORM
  // ===============================

  const resetForm = () => {
    setFormData({
      student:
        students.length > 0
          ? students[0]._id
          : "",
      date: new Date()
        .toISOString()
        .split("T")[0],
      status: "Present",
    });

    setEditingId(null);
  };

  // ===============================
  // MARK / UPDATE ATTENDANCE
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTeacher) {
      return;
    }

    if (!formData.student) {
      setMessage("Please select a student.");
      return;
    }

    if (!formData.date) {
      setMessage("Please select a date.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      let response;

      // ===============================
      // UPDATE
      // ===============================

      if (editingId) {
        response = await fetch(
          `${API_BASE_URL}/attendance/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: formData.date,
              status: formData.status,
            }),
          }
        );
      }

      // ===============================
      // CREATE
      // ===============================

      else {
        response = await fetch(
          `${API_BASE_URL}/attendance`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              student: formData.student,
              date: formData.date,
              status: formData.status,
            }),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Operation failed"
        );
      }

      setMessage(
        editingId
          ? "Attendance updated successfully! ✅"
          : "Attendance marked successfully! ✅"
      );

      resetForm();

      await fetchAttendance();
    } catch (error) {
      console.error(
        "Attendance save error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to save attendance."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // EDIT ATTENDANCE
  // ===============================

  const handleEdit = (record) => {
    if (!isTeacher) {
      return;
    }

    setEditingId(record._id);

    setFormData({
      student:
        record.student?._id ||
        record.student ||
        "",
      date: record.date
        ? record.date.substring(0, 10)
        : "",
      status:
        record.status || "Present",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // DELETE ATTENDANCE
  // ===============================

  const handleDelete = async (id) => {
    if (!isTeacher) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/attendance/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to delete attendance"
        );
      }

      setMessage(
        "Attendance deleted successfully! 🗑️"
      );

      await fetchAttendance();
    } catch (error) {
      console.error(
        "Delete attendance error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to delete attendance."
      );
    }
  };

  // ===============================
  // GET STUDENT NAME
  // ===============================

  const getStudentName = (record) => {
    if (
      record.student &&
      typeof record.student === "object"
    ) {
      return (
        record.student.name ||
        "Student"
      );
    }

    const foundStudent = students.find(
      (item) =>
        item._id === record.student
    );

    return (
      foundStudent?.name ||
      "Student"
    );
  };

  // ===============================
  // GET STUDENT ROLL NO
  // ===============================

  const getStudentRollNo = (record) => {
    if (
      record.student &&
      typeof record.student === "object"
    ) {
      return (
        record.student.rollNo ||
        "N/A"
      );
    }

    const foundStudent = students.find(
      (item) =>
        item._id === record.student
    );

    return (
      foundStudent?.rollNo ||
      "N/A"
    );
  };

  // ===============================
  // STATISTICS
  // ===============================

  const presentCount =
    attendance.filter(
      (item) =>
        item.status === "Present"
    ).length;

  const absentCount =
    attendance.filter(
      (item) =>
        item.status === "Absent"
    ).length;

  const totalCount =
    attendance.length;

  const percentage =
    totalCount > 0
      ? Math.round(
          (presentCount /
            totalCount) *
            100
        )
      : 0;

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="module-page">
        <div
          style={{
            padding: "50px",
            textAlign: "center",
          }}
        >
          Loading attendance...
        </div>
      </div>
    );
  }

  return (
    <div className="module-page">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="module-header">

        <div>
          <p>
            {isTeacher
              ? "Teacher Portal"
              : "Student Portal"}
          </p>

          <h1>Attendance</h1>

          <p>
            {isTeacher
              ? "Manage student attendance"
              : "View your attendance"}
          </p>
        </div>

        <button
          className="today-btn"
          onClick={fetchAttendance}
        >
          🔄 Refresh
        </button>

      </div>


      {/* ===============================
          MESSAGE
      =============================== */}

      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            color: "#1d4ed8",
          }}
        >
          {message}
        </div>
      )}


      {/* ===============================
          STUDENT SUMMARY
      =============================== */}

      {!isTeacher && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "15px",
            marginBottom: "25px",
          }}
        >

          <div className="stat-card">
            <h3>{totalCount}</h3>
            <p>Total Classes</p>
          </div>

          <div className="stat-card">
            <h3>{presentCount}</h3>
            <p>Present</p>
          </div>

          <div className="stat-card">
            <h3>{percentage}%</h3>
            <p>Attendance</p>
          </div>

        </div>
      )}


      {/* ===============================
          TEACHER FORM
      =============================== */}

      {isTeacher && (
        <div
          className="add-student-section"
          style={{
            marginBottom: "25px",
          }}
        >

          <div className="section-heading">

            <div>
              <h2>
                {editingId
                  ? "Edit Attendance"
                  : "Mark Attendance"}
              </h2>

              <p>
                {editingId
                  ? "Update attendance record"
                  : "Mark attendance using student roll number"}
              </p>
            </div>

          </div>


          <form
            className="student-form"
            onSubmit={handleSubmit}
          >

            {/* STUDENT / ROLL NUMBER */}

            <div className="form-group">

              <label>
                Student / Roll No.
              </label>

              <select
                name="student"
                value={formData.student}
                onChange={handleChange}
                required
                disabled={Boolean(editingId)}
              >

                <option value="">
                  Select Student
                </option>

                {students.map((student) => (
                  <option
                    key={student._id}
                    value={student._id}
                  >
                    {student.rollNo} -{" "}
                    {student.name}
                  </option>
                ))}

              </select>

              {students.length === 0 && (
                <small
                  style={{
                    color: "#dc2626",
                  }}
                >
                  No student accounts found.
                </small>
              )}

            </div>


            {/* DATE */}

            <div className="form-group">

              <label>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>


            {/* STATUS */}

            <div className="form-group">

              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >

                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>

              </select>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="add-student-btn"
              disabled={
                saving ||
                students.length === 0
              }
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Attendance"
                : "+ Mark Attendance"}
            </button>


            {/* CANCEL */}

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </form>

        </div>
      )}


      {/* ===============================
          ATTENDANCE LIST
      =============================== */}

      {attendance.length > 0 ? (

        <div className="attendance-list">

          {attendance.map((record) => (

            <div
              className="attendance-card"
              key={record._id}
            >

              <div>

                <h3>
                  {isTeacher
                    ? getStudentName(record)
                    : record.student?.name ||
                      user?.name ||
                      "My Attendance"}
                </h3>

                {/* ROLL NUMBER FOR TEACHER */}

                {isTeacher && (
                  <p>
                    🎓 Roll No:{" "}
                    <strong>
                      {getStudentRollNo(record)}
                    </strong>
                  </p>
                )}

                <p>
                  📅{" "}
                  {record.date
                    ? new Date(
                        record.date
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >

                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    background:
                      record.status ===
                      "Present"
                        ? "#dcfce7"
                        : "#fee2e2",
                    color:
                      record.status ===
                      "Present"
                        ? "#166534"
                        : "#991b1b",
                    fontWeight: "600",
                  }}
                >
                  {record.status ===
                  "Present"
                    ? "✅ Present"
                    : "❌ Absent"}
                </span>


                {/* TEACHER ONLY */}

                {isTeacher && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >

                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(record)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          record._id
                        )
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>
                )}

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >

          <h3>
            No attendance records found
          </h3>

          <p>
            {isTeacher
              ? "Mark attendance for a student to create a record."
              : "Your attendance records will appear here."}
          </p>

        </div>

      )}

    </div>
  );
}

export default Attendance;