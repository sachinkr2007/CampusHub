import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";

function Assignment() {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    title: "",
    dueDate: "",
    status: "Pending",
    description: "",
  });

  // ===============================
  // GET LOGGED-IN USER
  // ===============================

  const getUser = () => {
    const storedUser =
      localStorage.getItem("student");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error(
        "Invalid user data:",
        error
      );

      return null;
    }
  };

  // ===============================
  // CHECK TEACHER
  // ===============================

  const isTeacher =
    user?.role === "teacher";

  // ===============================
  // FETCH STUDENTS
  // ===============================

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/students`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch students"
        );
      }

      const data =
        await response.json();

      setStudents(
        Array.isArray(data)
          ? data
          : []
      );

      if (
        Array.isArray(data) &&
        data.length > 0
      ) {
        setFormData((prev) => ({
          ...prev,
          student:
            prev.student ||
            data[0]._id,
        }));
      }
    } catch (error) {
      console.error(
        "Student fetch error:",
        error
      );

      setMessage(
        "Unable to load students."
      );
    }
  };

  // ===============================
  // FETCH ASSIGNMENTS
  // ===============================

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setMessage("");

      const loggedInUser =
        getUser();

      if (!loggedInUser) {
        setMessage(
          "Please login first."
        );

        setAssignments([]);
        return;
      }

      setUser(loggedInUser);

      let url;

      // =========================
      // TEACHER
      // =========================

      if (
        loggedInUser.role ===
        "teacher"
      ) {
        url =
          `${API_BASE_URL}/assignments`;
      }

      // =========================
      // STUDENT
      // =========================

      else {
        if (!loggedInUser._id) {
          setMessage(
            "Student ID not found."
          );

          setAssignments([]);
          return;
        }

        url =
          `${API_BASE_URL}/assignments/student/${loggedInUser._id}`;
      }

      const response =
        await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch assignments"
        );
      }

      const data =
        await response.json();

      setAssignments(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Assignment fetch error:",
        error
      );

      setAssignments([]);

      setMessage(
        "Unable to load assignments."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // INITIAL LOAD
  // ===============================

  useEffect(() => {
    const loggedInUser =
      getUser();

    setUser(loggedInUser);

    if (
      loggedInUser?.role ===
      "teacher"
    ) {
      fetchStudents();
    }

    fetchAssignments();
  }, []);

  // ===============================
  // HANDLE INPUT
  // ===============================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

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
      subject: "",
      title: "",
      dueDate: "",
      status: "Pending",
      description: "",
    });

    setEditingId(null);
  };

  // ===============================
  // ADD / UPDATE
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.student) {
      alert(
        "Please select a student."
      );
      return;
    }

    if (!formData.subject.trim()) {
      alert(
        "Please enter subject."
      );
      return;
    }

    if (!formData.title.trim()) {
      alert(
        "Please enter assignment title."
      );
      return;
    }

    if (!formData.dueDate) {
      alert(
        "Please select due date."
      );
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const assignmentData = {
        student:
          formData.student,
        subject:
          formData.subject.trim(),
        title:
          formData.title.trim(),
        dueDate:
          formData.dueDate,
        status:
          formData.status,
        description:
          formData.description.trim(),
      };

      let response;

      // =========================
      // UPDATE
      // =========================

      if (editingId) {
        response =
          await fetch(
            `${API_BASE_URL}/assignments/${editingId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  assignmentData
                ),
            }
          );
      }

      // =========================
      // CREATE
      // =========================

      else {
        response =
          await fetch(
            `${API_BASE_URL}/assignments`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  assignmentData
                ),
            }
          );
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Operation failed"
        );
      }

      setMessage(
        editingId
          ? "Assignment updated successfully! ✅"
          : "Assignment added successfully! ✅"
      );

      resetForm();

      await fetchAssignments();
    } catch (error) {
      console.error(
        "Assignment save error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to save assignment."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // EDIT
  // ===============================

  const handleEdit = (assignment) => {
    setEditingId(
      assignment._id
    );

    setFormData({
      student:
        assignment.student?._id ||
        assignment.student ||
        "",
      subject:
        assignment.subject ||
        "",
      title:
        assignment.title ||
        "",
      dueDate:
        assignment.dueDate
          ? assignment.dueDate.substring(
              0,
              10
            )
          : "",
      status:
        assignment.status ||
        "Pending",
      description:
        assignment.description ||
        "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // DELETE
  // ===============================

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this assignment?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/assignments/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to delete assignment"
        );
      }

      setMessage(
        "Assignment deleted successfully! ✅"
      );

      await fetchAssignments();
    } catch (error) {
      console.error(
        "Delete assignment error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to delete assignment."
      );
    }
  };

  // ===============================
  // STUDENT NAME
  // ===============================

  const getStudentName = (
    assignment
  ) => {
    if (
      assignment.student &&
      typeof assignment.student ===
        "object"
    ) {
      return (
        assignment.student.name ||
        "Student"
      );
    }

    const student =
      students.find(
        (s) =>
          s._id ===
          assignment.student
      );

    return (
      student?.name ||
      "Student"
    );
  };

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

          <h1>
            Assignments
          </h1>

          <p>
            {isTeacher
              ? "Manage student assignments"
              : "View your assignments"}
          </p>

        </div>

        <button
          className="today-btn"
          onClick={
            fetchAssignments
          }
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
            border:
              "1px solid #bfdbfe",
            borderRadius: "8px",
            color: "#1d4ed8",
          }}
        >
          {message}
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
                  ? "Edit Assignment"
                  : "Add Assignment"}
              </h2>

              <p>
                {editingId
                  ? "Update assignment details"
                  : "Create a new assignment for a student"}
              </p>

            </div>

          </div>


          <form
            className="student-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* STUDENT */}

            <div className="form-group">

              <label>
                Student
              </label>

              <select
                name="student"
                value={
                  formData.student
                }
                onChange={
                  handleChange
                }
                required
              >

                <option value="">
                  Select Student
                </option>

                {students.map(
                  (student) => (

                    <option
                      key={
                        student._id
                      }
                      value={
                        student._id
                      }
                    >
                      {
                        student.name
                      }
                    </option>

                  )
                )}

              </select>

            </div>


            {/* SUBJECT */}

            <div className="form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="e.g. Data Structures"
                value={
                  formData.subject
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            {/* TITLE */}

            <div className="form-group">

              <label>
                Assignment Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Linked List Assignment"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            {/* DUE DATE */}

            <div className="form-group">

              <label>
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={
                  formData.dueDate
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            {/* STATUS */}

            <div className="form-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Submitted">
                  Submitted
                </option>

              </select>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Assignment description..."
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows="4"
              />

            </div>


            <button
              type="submit"
              className="add-student-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Assignment"
                : "+ Add Assignment"}
            </button>


            {editingId && (

              <button
                type="button"
                className="cancel-btn"
                onClick={
                  resetForm
                }
              >
                Cancel
              </button>

            )}

          </form>

        </div>

      )}


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
          Loading assignments...
        </div>

      )}


      {/* ===============================
          ASSIGNMENT LIST
      =============================== */}

      {!loading &&
        assignments.length > 0 && (

          <div className="assignments-list">

            {assignments.map(
              (assignment) => (

                <div
                  className="assignment-card"
                  key={
                    assignment._id
                  }
                >

                  <div className="assignment-card-content">

                    <div>

                      <span
                        className="assignment-subject"
                      >
                        {
                          assignment.subject
                        }
                      </span>

                      <h3>
                        {
                          assignment.title
                        }
                      </h3>

                      <p>
                        {
                          assignment.description ||
                          "No description available."
                        }
                      </p>

                    </div>


                    <div className="assignment-meta">

                      <span>
                        📅 Due:{" "}
                        {assignment.dueDate
                          ? new Date(
                              assignment.dueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>


                      <span>
                        📌{" "}
                        {
                          assignment.status
                        }
                      </span>


                      {/* TEACHER ONLY */}

                      {isTeacher && (

                        <span>
                          👤{" "}
                          {
                            getStudentName(
                              assignment
                            )
                          }
                        </span>

                      )}

                    </div>

                  </div>


                  {/* TEACHER ACTIONS */}

                  {isTeacher && (

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >

                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(
                            assignment
                          )
                        }
                      >
                        ✏️ Edit
                      </button>


                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            assignment._id
                          )
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  )}

                </div>

              )
            )}

          </div>

        )}


      {/* ===============================
          NO DATA
      =============================== */}

      {!loading &&
        assignments.length ===
          0 && (

          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >

            <h3>
              No assignments found
            </h3>

            <p>
              {isTeacher
                ? "No assignments have been added yet."
                : "You currently have no assignments."}
            </p>

          </div>

        )}

    </div>
  );
}

export default Assignment;