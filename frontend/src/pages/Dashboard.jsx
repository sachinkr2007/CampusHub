import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

function Dashboard() {
  const [student, setStudent] = useState(null);

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);

  const [dashboardLoading, setDashboardLoading] =
    useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
    skills: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  // =========================
  // GET LOGGED-IN USER
  // =========================

  useEffect(() => {
    const storedStudent =
      localStorage.getItem("student");

    if (!storedStudent) {
      setStudent(null);
      return;
    }

    try {
      const loggedInStudent =
        JSON.parse(storedStudent);

      setStudent(loggedInStudent);
    } catch (err) {
      console.error(
        "Student data error:",
        err
      );

      setStudent(null);
    }
  }, []);

  // =========================
  // CHECK TEACHER
  // =========================

  const isTeacher =
    student?.role === "teacher";

  // =========================
  // GET STUDENTS
  // =========================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

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
    } catch (err) {
      console.error(
        "Error fetching students:",
        err
      );

      setError(
        "Unable to load students. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET DASHBOARD DATA
  // =========================

  const fetchDashboardData = async () => {
    try {
      setDashboardLoading(true);

      const storedStudent =
        localStorage.getItem("student");

      if (!storedStudent) {
        setAttendance([]);
        setAssignments([]);
        setExams([]);
        setResults([]);
        return;
      }

      let loggedInStudent;

      try {
        loggedInStudent =
          JSON.parse(storedStudent);
      } catch (err) {
        console.error(
          "Invalid student data:",
          err
        );

        setAttendance([]);
        setAssignments([]);
        setExams([]);
        setResults([]);

        return;
      }

      const studentId =
        loggedInStudent?._id;

      if (!studentId) {
        setAttendance([]);
        setAssignments([]);
        setExams([]);
        setResults([]);

        return;
      }

      const [
        attendanceResponse,
        assignmentsResponse,
        examsResponse,
        resultsResponse,
      ] = await Promise.all([
        fetch(
          `${API_BASE_URL}/attendance/student/${studentId}`
        ),

        fetch(
          `${API_BASE_URL}/assignments/student/${studentId}`
        ),

        fetch(
          `${API_BASE_URL}/exams/student/${studentId}`
        ),

        fetch(
          `${API_BASE_URL}/results/student/${studentId}`
        ),
      ]);

      if (!attendanceResponse.ok) {
        throw new Error(
          "Failed to fetch attendance"
        );
      }

      if (!assignmentsResponse.ok) {
        throw new Error(
          "Failed to fetch assignments"
        );
      }

      if (!examsResponse.ok) {
        throw new Error(
          "Failed to fetch exams"
        );
      }

      if (!resultsResponse.ok) {
        throw new Error(
          "Failed to fetch results"
        );
      }

      const attendanceData =
        await attendanceResponse.json();

      const assignmentsData =
        await assignmentsResponse.json();

      const examsData =
        await examsResponse.json();

      const resultsData =
        await resultsResponse.json();

      setAttendance(
        Array.isArray(attendanceData)
          ? attendanceData
          : []
      );

      setAssignments(
        Array.isArray(assignmentsData)
          ? assignmentsData
          : []
      );

      setExams(
        Array.isArray(examsData)
          ? examsData
          : []
      );

      setResults(
        Array.isArray(resultsData)
          ? resultsData
          : []
      );
    } catch (err) {
      console.error(
        "Dashboard data error:",
        err
      );

      setAttendance([]);
      setAssignments([]);
      setExams([]);
      setResults([]);
    } finally {
      setDashboardLoading(false);
    }
  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =========================
  // LOAD STUDENTS ONLY FOR TEACHER
  // =========================

  useEffect(() => {
    if (student?.role === "teacher") {
      fetchStudents();
    } else {
      setStudents([]);
      setLoading(false);
    }
  }, [student]);

  // =========================
  // UNIQUE COURSES
  // =========================

  const uniqueCourses = [
    ...new Set(
      students
        .map(
          (student) =>
            student.course
        )
        .filter(
          (course) =>
            course &&
            typeof course ===
              "string" &&
            course.trim() !== ""
        )
    ),
  ];

  // =========================
  // HANDLE INPUT
  // =========================

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

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      course: "",
      year: "",
      skills: "",
    });

    setEditingId(null);
  };

  // =========================
  // ADD / UPDATE STUDENT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name.trim()) {
        alert(
          "Please enter student name."
        );
        return;
      }

      if (!formData.email.trim()) {
        alert(
          "Please enter student email."
        );
        return;
      }

      if (!formData.course.trim()) {
        alert(
          "Please enter student course."
        );
        return;
      }

      if (!formData.year) {
        alert(
          "Please select student year."
        );
        return;
      }

      const studentData = {
        name:
          formData.name.trim(),

        email:
          formData.email
            .trim()
            .toLowerCase(),

        course:
          formData.course.trim(),

        year:
          Number(formData.year),

        skills:
          formData.skills
            .split(",")
            .map(
              (skill) =>
                skill.trim()
            )
            .filter(
              (skill) =>
                skill !== ""
            ),

        role: "student",
      };

      // =========================
      // UPDATE
      // =========================

      if (editingId) {
        const response =
          await fetch(
            `${API_BASE_URL}/students/${editingId}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  studentData
                ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to update student"
          );
        }

        alert(
          "Student updated successfully!"
        );
      }

      // =========================
      // ADD
      // =========================

      else {
        const response =
          await fetch(
            `${API_BASE_URL}/students`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  studentData
                ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to add student"
          );
        }

        alert(
          "Student added successfully!"
        );
      }

      resetForm();

      await fetchStudents();
    } catch (err) {
      console.error(
        "Submit error:",
        err
      );

      alert(
        "Something went wrong. Please try again."
      );
    }
  };

  // =========================
  // EDIT STUDENT
  // =========================

  const handleEdit = (
    selectedStudent
  ) => {
    setEditingId(
      selectedStudent._id
    );

    setFormData({
      name:
        selectedStudent.name ||
        "",

      email:
        selectedStudent.email ||
        "",

      course:
        selectedStudent.course ||
        "",

      year:
        selectedStudent.year ||
        "",

      skills:
        Array.isArray(
          selectedStudent.skills
        )
          ? selectedStudent.skills.join(
              ", "
            )
          : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {
    resetForm();
  };

  // =========================
  // DELETE STUDENT
  // =========================

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/students/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to delete student"
        );
      }

      alert(
        "Student deleted successfully!"
      );

      await fetchStudents();
    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      alert(
        "Error deleting student."
      );
    }
  };

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setYearFilter("");
    setCourseFilter("");
  };

  // =========================
  // FILTER STUDENTS
  // =========================

  const filteredStudents =
    students.filter(
      (student) => {
        const searchText =
          search
            .toLowerCase()
            .trim();

        const studentName =
          student.name
            ?.toLowerCase() ||
          "";

        const studentEmail =
          student.email
            ?.toLowerCase() ||
          "";

        const studentCourse =
          student.course
            ?.toLowerCase() ||
          "";

        const studentSkills =
          Array.isArray(
            student.skills
          )
            ? student.skills
                .join(" ")
                .toLowerCase()
            : "";

        const matchesSearch =
          studentName.includes(
            searchText
          ) ||
          studentEmail.includes(
            searchText
          ) ||
          studentCourse.includes(
            searchText
          ) ||
          studentSkills.includes(
            searchText
          );

        const matchesYear =
          yearFilter === "" ||
          String(
            student.year
          ) ===
            String(
              yearFilter
            );

        const matchesCourse =
          courseFilter === "" ||
          student.course ===
            courseFilter;

        return (
          matchesSearch &&
          matchesYear &&
          matchesCourse
        );
      }
    );

  // =========================
  // DASHBOARD STATS
  // =========================

  const totalStudents =
    students.length;

  const displayedStudents =
    filteredStudents.length;

  const totalAttendance =
    attendance.length;

  const presentAttendance =
    attendance.filter(
      (record) =>
        record.status ===
        "Present"
    ).length;

  const attendancePercentage =
    totalAttendance > 0
      ? Math.round(
          (presentAttendance /
            totalAttendance) *
            100
        )
      : 0;

  const totalAssignments =
    assignments.length;

  const pendingAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status ===
        "Pending"
    ).length;

  const totalExams =
    exams.length;

  // =========================
  // ACADEMIC PROGRESS
  // =========================

  const totalMarksObtained =
    results.reduce(
      (total, result) =>
        total +
        Number(
          result.marks || 0
        ),
      0
    );

  const totalPossibleMarks =
    results.reduce(
      (total, result) =>
        total +
        Number(
          result.totalMarks ||
            0
        ),
      0
    );

  const academicProgress =
    totalPossibleMarks > 0
      ? Math.round(
          (totalMarksObtained /
            totalPossibleMarks) *
            100
        )
      : 0;

  // =========================
  // NEXT EXAM
  // =========================

  const nextExam =
    exams.length > 0
      ? exams[0]
      : null;

  const getDaysUntilExam = (
    examDate
  ) => {
    if (!examDate) {
      return "";
    }

    const today =
      new Date();

    const exam =
      new Date(examDate);

    today.setHours(
      0,
      0,
      0,
      0
    );

    exam.setHours(
      0,
      0,
      0,
      0
    );

    const difference =
      exam.getTime() -
      today.getTime();

    const days =
      Math.ceil(
        difference /
          (1000 *
            60 *
            60 *
            24)
      );

    if (days < 0) {
      return "Exam completed";
    }

    if (days === 0) {
      return "Exam is today";
    }

    if (days === 1) {
      return "Next exam tomorrow";
    }

    return `Next exam in ${days} days`;
  };

  return (
    <div>

      {/* =========================
          WELCOME
      ========================= */}

      <div className="welcome-section">

        <p>
          Good Morning 👋
        </p>

        <h1>
          Welcome back,{" "}
          {student?.name ||
            "Student"}!
        </h1>

      </div>


      {/* =========================
          DASHBOARD CARDS
      ========================= */}

      <div className="dashboard-cards">

        <Link
          to="/dashboard/attendance"
          className="dashboard-stat"
          style={{
            textDecoration:
              "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span>
            Attendance
          </span>

          <h2>
            {dashboardLoading
              ? "..."
              : `${attendancePercentage}%`}
          </h2>

          <small>
            {dashboardLoading
              ? "Loading..."
              : `${presentAttendance} of ${totalAttendance} classes present`}
          </small>
        </Link>


        <Link
          to="/dashboard/assignments"
          className="dashboard-stat"
          style={{
            textDecoration:
              "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span>
            Assignments
          </span>

          <h2>
            {dashboardLoading
              ? "..."
              : String(
                  totalAssignments
                ).padStart(
                  2,
                  "0"
                )}
          </h2>

          <small>
            {dashboardLoading
              ? "Loading..."
              : `${pendingAssignments} pending`}
          </small>
        </Link>


        <div
          className="dashboard-stat"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            if (!nextExam) {
              alert(
                "No upcoming exams found."
              );

              return;
            }

            alert(
              `Next Exam\n\n` +
                `Subject: ${nextExam.subject}\n\n` +
                `Exam: ${nextExam.examName}\n\n` +
                `Date: ${new Date(
                  nextExam.examDate
                ).toLocaleDateString(
                  "en-GB"
                )}\n\n` +
                `Time: ${nextExam.examTime}\n\n` +
                `Room: ${nextExam.room}`
            );
          }}
        >
          <span>
            Upcoming Exams
          </span>

          <h2>
            {dashboardLoading
              ? "..."
              : String(
                  totalExams
                ).padStart(
                  2,
                  "0"
                )}
          </h2>

          <small>
            {dashboardLoading
              ? "Loading..."
              : nextExam
              ? getDaysUntilExam(
                  nextExam.examDate
                )
              : "No upcoming exams"}
          </small>
        </div>

      </div>


      {/* =========================
          ACADEMIC PROGRESS
      ========================= */}

      <div className="progress-section">

        <div className="section-title">

          <h3>
            Academic Progress
          </h3>

          <span>
            {dashboardLoading
              ? "..."
              : `${academicProgress}%`}
          </span>

        </div>

        <div className="main-progress">

          <div
            style={{
              width:
                `${academicProgress}%`,
            }}
          ></div>

        </div>

        <small
          style={{
            display:
              "block",
            marginTop:
              "8px",
          }}
        >
          {dashboardLoading
            ? "Loading results..."
            : results.length > 0
            ? `${totalMarksObtained} of ${totalPossibleMarks} marks`
            : "No results available"}
        </small>

      </div>


      {/* =========================
          TEACHER ONLY
          STUDENT MANAGEMENT
      ========================= */}

      {isTeacher && (
        <>
          {/* ADD / EDIT STUDENT */}

          <div className="add-student-section">

            <div className="section-heading">

              <div>

                <h2>
                  {editingId
                    ? "Edit Student"
                    : "Add Student"}
                </h2>

                <p>
                  {editingId
                    ? "Update student information"
                    : "Add a new student to the database"}
                </p>

              </div>

            </div>


            <form
              className="student-form"
              onSubmit={
                handleSubmit
              }
            >

              <div className="form-group">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Course
                </label>

                <input
                  type="text"
                  name="course"
                  placeholder="e.g. B.Tech AIML"
                  value={
                    formData.course
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  placeholder="e.g. 2"
                  value={
                    formData.year
                  }
                  onChange={
                    handleChange
                  }
                  min="1"
                  max="4"
                  required
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  placeholder="JavaScript, React, Node.js"
                  value={
                    formData.skills
                  }
                  onChange={
                    handleChange
                  }
                />

                <small>
                  Separate skills with commas
                </small>

              </div>


              <button
                type="submit"
                className="add-student-btn"
              >
                {editingId
                  ? "Update Student"
                  : "+ Add Student"}
              </button>


              {editingId && (

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={
                    handleCancelEdit
                  }
                >
                  Cancel
                </button>

              )}

            </form>

          </div>


          {/* STUDENTS SECTION */}

          <div className="students-section">

            <div className="students-heading">

              <div>

                <h2>
                  Students
                </h2>

                <p>
                  Student information from database
                </p>

              </div>


              <span className="student-count">

                {displayedStudents} /{" "}
                {totalStudents} Student
                {totalStudents !==
                1
                  ? "s"
                  : ""}

              </span>

            </div>


            {/* SEARCH + FILTERS */}

            <div className="student-filters">

              <input
                type="text"
                placeholder="🔍 Search by name, email, course or skill..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />


              <select
                value={
                  yearFilter
                }
                onChange={(e) =>
                  setYearFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Years
                </option>

                <option value="1">
                  Year 1
                </option>

                <option value="2">
                  Year 2
                </option>

                <option value="3">
                  Year 3
                </option>

                <option value="4">
                  Year 4
                </option>

              </select>


              <select
                value={
                  courseFilter
                }
                onChange={(e) =>
                  setCourseFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Courses
                </option>

                {uniqueCourses.map(
                  (course) => (

                    <option
                      key={course}
                      value={course}
                    >
                      {course}
                    </option>

                  )
                )}

              </select>


              <button
                type="button"
                className="clear-filter-btn"
                onClick={
                  clearFilters
                }
              >
                Clear Filters
              </button>


              <button
                type="button"
                className="clear-filter-btn"
                onClick={
                  fetchStudents
                }
              >
                🔄 Refresh
              </button>

            </div>


            {/* LOADING */}

            {loading && (

              <p className="no-students">
                Loading students...
              </p>

            )}


            {/* ERROR */}

            {!loading &&
              error && (

                <div className="no-students">

                  <p>
                    {error}
                  </p>

                  <button
                    type="button"
                    className="clear-filter-btn"
                    onClick={
                      fetchStudents
                    }
                  >
                    Try Again
                  </button>

                </div>

              )}


            {/* STUDENT LIST */}

            {!loading &&
              !error && (

                <div className="student-list">

                  {filteredStudents.length ===
                  0 ? (

                    <p className="no-students">
                      No students found.
                    </p>

                  ) : (

                    filteredStudents.map(
                      (student) => (

                        <div
                          className="student-card"
                          key={
                            student._id
                          }
                        >

                          <div className="student-card-header">

                            <div className="student-avatar">

                              {student.name
                                ? student.name
                                    .charAt(
                                      0
                                    )
                                    .toUpperCase()
                                : "S"}

                            </div>


                            <div>

                              <h3>
                                {
                                  student.name
                                }
                              </h3>

                              <p>
                                {
                                  student.course
                                }
                              </p>

                            </div>

                          </div>


                          <div className="student-info">

                            <div className="info-item">

                              <span className="info-label">
                                Email
                              </span>

                              <span className="info-value">
                                {
                                  student.email
                                }
                              </span>

                            </div>


                            <div className="info-item">

                              <span className="info-label">
                                Year
                              </span>

                              <span className="info-value">
                                Year{" "}
                                {
                                  student.year
                                }
                              </span>

                            </div>

                          </div>


                          <div className="student-skills">

                            <span className="info-label">
                              Skills
                            </span>


                            <div className="skills-list">

                              {Array.isArray(
                                student.skills
                              ) &&
                                student.skills.map(
                                  (
                                    skill,
                                    index
                                  ) => (

                                    <span
                                      className="skill-badge"
                                      key={`${student._id}-${index}`}
                                    >
                                      {
                                        skill
                                      }
                                    </span>

                                  )
                                )}

                            </div>

                          </div>


                          <div className="student-actions">

                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEdit(
                                  student
                                )
                              }
                            >
                              ✏️ Edit
                            </button>


                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  student._id
                                )
                              }
                            >
                              🗑️ Delete
                            </button>

                          </div>

                        </div>

                      )
                    )

                  )}

                </div>

              )}

          </div>
        </>
      )}


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="quick-actions-section">

        <div className="section-heading">

          <div>

            <h2>
              Quick Actions
            </h2>

            <p>
              Quickly access important student features
            </p>

          </div>

        </div>


        <div className="quick-actions-grid">

          <Link to="/dashboard/attendance">
            📊 Attendance
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

          <Link to="/dashboard/settings">
            ⚙️ Settings
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;