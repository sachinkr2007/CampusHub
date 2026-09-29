import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";

function Timetable() {
  const [user, setUser] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    student: "",
    day: "Monday",
    time: "",
    subject: "",
    room: "",
  });

  const API = API_BASE_URL;

  // ===============================
  // GET LOGGED-IN USER
  // ===============================

  const getUser = () => {
    const storedStudent =
      localStorage.getItem("student");

    if (!storedStudent) {
      return null;
    }

    try {
      return JSON.parse(storedStudent);
    } catch (error) {
      console.error(
        "Invalid login data:",
        error
      );

      return null;
    }
  };

  // ===============================
  // FETCH STUDENTS
  // ===============================

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API}/students`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch students"
        );
      }

      const data =
        await response.json();

      const studentList =
        Array.isArray(data)
          ? data
          : [];

      setStudents(studentList);

      if (
        studentList.length > 0 &&
        !formData.student
      ) {
        setFormData((prev) => ({
          ...prev,
          student:
            studentList[0]._id,
        }));
      }
    } catch (error) {
      console.error(
        "Students fetch error:",
        error
      );

      setMessage(
        "Unable to load students."
      );
    }
  };

  // ===============================
  // FETCH TIMETABLE
  // ===============================

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      setMessage("");

      const loggedInUser =
        getUser();

      if (!loggedInUser) {
        setTimetable([]);
        setMessage(
          "Please login first."
        );
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
        url = `${API}/timetable`;
      }

      // =========================
      // STUDENT
      // =========================

      else {
        if (!loggedInUser._id) {
          setTimetable([]);
          setMessage(
            "Student ID not found."
          );
          return;
        }

        url =
          `${API}/timetable/student/${loggedInUser._id}`;
      }

      const response =
        await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch timetable"
        );
      }

      const data =
        await response.json();

      setTimetable(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Timetable fetch error:",
        error
      );

      setTimetable([]);

      setMessage(
        "Unable to load timetable."
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

    fetchTimetable();
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
    setEditingId(null);

    setFormData({
      student:
        students.length > 0
          ? students[0]._id
          : "",
      day: "Monday",
      time: "",
      subject: "",
      room: "",
    });
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

    if (!formData.time) {
      alert(
        "Please enter class time."
      );
      return;
    }

    if (!formData.subject) {
      alert(
        "Please enter subject."
      );
      return;
    }

    if (!formData.room) {
      alert(
        "Please enter room."
      );
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      let response;

      // =========================
      // UPDATE
      // =========================

      if (editingId) {
        response =
          await fetch(
            `${API}/timetable/${editingId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                student:
                  formData.student,
                day:
                  formData.day,
                time:
                  formData.time,
                subject:
                  formData.subject,
                room:
                  formData.room,
              }),
            }
          );
      }

      // =========================
      // CREATE
      // =========================

      else {
        response =
          await fetch(
            `${API}/timetable`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                student:
                  formData.student,
                day:
                  formData.day,
                time:
                  formData.time,
                subject:
                  formData.subject,
                room:
                  formData.room,
              }),
            }
          );
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Operation failed"
        );
      }

      setMessage(
        editingId
          ? "Timetable updated successfully! ✅"
          : "Timetable class added successfully! ✅"
      );

      resetForm();

      await fetchTimetable();
    } catch (error) {
      console.error(
        "Timetable save error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to save timetable."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // EDIT CLASS
  // ===============================

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      student:
        item.student?._id ||
        item.student ||
        "",
      day:
        item.day ||
        "Monday",
      time:
        item.time ||
        "",
      subject:
        item.subject ||
        "",
      room:
        item.room ||
        "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // DELETE CLASS
  // ===============================

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this class?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");

      const response =
        await fetch(
          `${API}/timetable/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete class"
        );
      }

      setMessage(
        "Timetable class deleted successfully! ✅"
      );

      await fetchTimetable();
    } catch (error) {
      console.error(
        "Delete timetable error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to delete class."
      );
    }
  };

  // ===============================
  // GROUP BY DAYS
  // ===============================

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const groupedTimetable =
    days.map((day) => ({
      day,
      classes:
        timetable.filter(
          (item) =>
            item.day === day
        ),
    }));

  // ===============================
  // ROLE
  // ===============================

  const isTeacher =
    user?.role === "teacher";

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
            Weekly Timetable
          </h1>

          <p>
            {isTeacher
              ? "Manage student timetable"
              : "View your weekly timetable"}
          </p>

        </div>

        <button
          className="today-btn"
          onClick={
            fetchTimetable
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
                  ? "Edit Timetable"
                  : "Add Timetable Class"}
              </h2>

              <p>
                {editingId
                  ? "Update class details"
                  : "Add a class for a student"}
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


            {/* DAY */}

            <div className="form-group">

              <label>
                Day
              </label>

              <select
                name="day"
                value={
                  formData.day
                }
                onChange={
                  handleChange
                }
                required
              >

                {days.map(
                  (day) => (

                    <option
                      key={day}
                      value={day}
                    >
                      {day}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* TIME */}

            <div className="form-group">

              <label>
                Time
              </label>

              <input
                type="text"
                name="time"
                value={
                  formData.time
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. 9:00 AM - 10:00 AM"
                required
              />

            </div>


            {/* SUBJECT */}

            <div className="form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={
                  formData.subject
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Machine Learning"
                required
              />

            </div>


            {/* ROOM */}

            <div className="form-group">

              <label>
                Room
              </label>

              <input
                type="text"
                name="room"
                value={
                  formData.room
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Lab 204"
                required
              />

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="add-student-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Class"
                : "+ Add Class"}
            </button>


            {/* CANCEL */}

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
          Loading timetable...
        </div>

      )}


      {/* ===============================
          TIMETABLE
      =============================== */}

      {!loading &&
        timetable.length > 0 && (

          <div className="timetable">

            {groupedTimetable.map(
              (day) => (

                <div
                  className="day-card"
                  key={
                    day.day
                  }
                >

                  <div className="day-header">

                    <h3>
                      {day.day}
                    </h3>

                    <span>
                      {
                        day.classes
                          .length
                      }{" "}
                      Classes
                    </span>

                  </div>


                  <div className="class-list">

                    {day.classes.map(
                      (item) => (

                        <div
                          className="class-card"
                          key={
                            item._id
                          }
                        >

                          <div className="class-time">
                            {
                              item.time
                            }
                          </div>


                          <div className="class-info">

                            <h4>
                              {
                                item.subject
                              }
                            </h4>

                            <p>
                              📍{" "}
                              {
                                item.room
                              }
                            </p>

                            {/* TEACHER ONLY */}

                            {isTeacher && (

                              <p
                                style={{
                                  marginTop:
                                    "5px",
                                  fontWeight:
                                    "600",
                                }}
                              >
                                👨‍🎓{" "}
                                {
                                  item
                                    .student
                                    ?.name ||
                                  "Student"
                                }
                              </p>

                            )}

                          </div>


                          {/* TEACHER ACTIONS */}

                          {isTeacher && (

                            <div
                              style={{
                                display:
                                  "flex",
                                gap: "8px",
                                marginLeft:
                                  "auto",
                              }}
                            >

                              <button
                                type="button"
                                className="edit-btn"
                                onClick={() =>
                                  handleEdit(
                                    item
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
                                    item._id
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


                    {/* NO CLASS */}

                    {day.classes
                      .length ===
                      0 && (

                      <p
                        style={{
                          padding:
                            "15px",
                          color:
                            "#777",
                        }}
                      >
                        No classes
                      </p>

                    )}

                  </div>

                </div>

              )
            )}

          </div>

        )}


      {/* ===============================
          NO DATA
      =============================== */}

      {!loading &&
        timetable.length ===
          0 && (

          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >

            <h3>
              No timetable found
            </h3>

            <p>
              {isTeacher
                ? "No timetable classes have been added yet."
                : "There are currently no timetable classes available for you."}
            </p>

          </div>

        )}

    </div>
  );
}

export default Timetable;