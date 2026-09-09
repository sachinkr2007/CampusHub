import { useEffect, useState } from "react";

function TeacherResults() {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");

  const [formData, setFormData] = useState({
    subject: "",
    marks: "",
    totalMarks: "",
    grade: "",
    semester: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ===============================
  // FETCH ONLY STUDENTS
  // ===============================
  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/students"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      // Teacher ko student list me show nahi karna
      const onlyStudents = data.filter(
        (user) => user.role === "student"
      );

      setStudents(onlyStudents);
    } catch (err) {
      console.error(err);
      setError("Unable to load students.");
    }
  };

  // ===============================
  // FETCH SELECTED STUDENT RESULTS
  // ===============================
  const fetchStudentResults = async (studentId) => {
    try {
      setError("");
      setMessage("");

      if (!studentId) {
        setResults([]);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/results/student/${studentId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();

      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load student results.");
      setResults([]);
    }
  };

  // ===============================
  // LOAD STUDENTS
  // ===============================
  useEffect(() => {
    fetchStudents();
  }, []);

  // ===============================
  // STUDENT CHANGE
  // ===============================
  const handleStudentChange = (e) => {
    const studentId = e.target.value;

    setSelectedStudent(studentId);

    fetchStudentResults(studentId);
  };

  // ===============================
  // FORM CHANGE
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // ADD RESULT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!selectedStudent) {
      setError("Please select a student.");
      return;
    }

    if (
      !formData.subject ||
      !formData.marks ||
      !formData.totalMarks ||
      !formData.semester
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    if (
      Number(formData.marks) >
      Number(formData.totalMarks)
    ) {
      setError(
        "Marks cannot be greater than total marks."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/results",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: selectedStudent,
            subject: formData.subject,
            marks: Number(formData.marks),
            totalMarks: Number(formData.totalMarks),
            grade: formData.grade,
            semester: Number(formData.semester),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to add result"
        );
      }

      setMessage(
        "Result added successfully!"
      );

      // Clear form
      setFormData({
        subject: "",
        marks: "",
        totalMarks: "",
        grade: "",
        semester: "",
      });

      // Refresh results
      fetchStudentResults(selectedStudent);

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to add result."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // DELETE RESULT
  // ===============================
  const handleDelete = async (resultId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `http://localhost:5000/api/results/${resultId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Failed to delete result"
        );
      }

      setMessage(
        "Result deleted successfully!"
      );

      fetchStudentResults(selectedStudent);

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to delete result."
      );
    }
  };

  // ===============================
  // SELECTED STUDENT DATA
  // ===============================
  const student = students.find(
    (item) => item._id === selectedStudent
  );

  return (
    <div className="module-page">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="module-header">

        <div>
          <p>Teacher Portal</p>

          <h1>
            Student Results
          </h1>
        </div>

        <span className="job-count">
          Teacher Panel
        </span>

      </div>


      {/* ===============================
          MESSAGES
      =============================== */}

      {message && (
        <div
          style={{
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            background: "#e8f7ee",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            background: "#fdeaea",
          }}
        >
          {error}
        </div>
      )}


      {/* ===============================
          SELECT STUDENT
      =============================== */}

      <div className="students-section">

        <div className="students-heading">

          <div>
            <h2>
              Select Student
            </h2>

            <p>
              Select a student to manage
              academic results
            </p>
          </div>

        </div>


        <select
          value={selectedStudent}
          onChange={handleStudentChange}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        >

          <option value="">
            Select Student
          </option>

          {students.map((item) => (
            <option
              key={item._id}
              value={item._id}
            >
              {item.rollNo} - {item.name}
            </option>
          ))}

        </select>

      </div>


      {/* ===============================
          STUDENT INFORMATION
      =============================== */}

      {student && (
        <div
          style={{
            marginTop: "20px",
            padding: "18px",
            borderRadius: "12px",
            background: "#f8f9fa",
          }}
        >

          <h3>
            {student.name}
          </h3>

          <p>
            Roll No: {student.rollNo}
          </p>

          <p>
            Email: {student.email}
          </p>

          <p>
            Course: {student.course}
          </p>

          <p>
            Year: {student.year}
          </p>

        </div>
      )}


      {/* ===============================
          ADD RESULT FORM
      =============================== */}

      {selectedStudent && (

        <div
          className="students-section"
          style={{
            marginTop: "20px",
          }}
        >

          <div className="students-heading">

            <div>
              <h2>
                Add Result
              </h2>

              <p>
                Enter academic result
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            {/* SUBJECT */}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />


            {/* MARKS */}

            <input
              type="number"
              name="marks"
              placeholder="Marks Obtained"
              value={formData.marks}
              onChange={handleChange}
              min="0"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />


            {/* TOTAL MARKS */}

            <input
              type="number"
              name="totalMarks"
              placeholder="Total Marks"
              value={formData.totalMarks}
              onChange={handleChange}
              min="1"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />


            {/* GRADE */}

            <input
              type="text"
              name="grade"
              placeholder="Grade (A+, A, B...)"
              value={formData.grade}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />


            {/* SEMESTER */}

            <input
              type="number"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              min="1"
              max="8"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />


            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "15px",
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {loading
                ? "Adding..."
                : "Add Result"}
            </button>

          </form>

        </div>
      )}


      {/* ===============================
          EXISTING RESULTS
      =============================== */}

      {selectedStudent && (

        <div
          className="students-section"
          style={{
            marginTop: "20px",
          }}
        >

          <div className="students-heading">

            <div>
              <h2>
                Existing Results
              </h2>

              <p>
                Results of selected student
              </p>
            </div>

          </div>


          {results.length === 0 ? (

            <p
              style={{
                padding: "20px",
              }}
            >
              No results found for this
              student.
            </p>

          ) : (

            <div className="student-list">

              {results.map((result) => (

                <div
                  className="student-card"
                  key={result._id}
                >

                  <div className="student-card-header">

                    <div className="student-avatar">
                      {result.subject
                        ?.charAt(0)
                        ?.toUpperCase() || "R"}
                    </div>

                    <div>

                      <h3>
                        {result.subject}
                      </h3>

                      <p>
                        Semester{" "}
                        {result.semester}
                      </p>

                    </div>

                  </div>


                  <div className="student-info">

                    <div className="info-item">

                      <span className="info-label">
                        Marks
                      </span>

                      <span className="info-value">
                        {result.marks} /{" "}
                        {result.totalMarks}
                      </span>

                    </div>


                    <div className="info-item">

                      <span className="info-label">
                        Grade
                      </span>

                      <span className="info-value">
                        {result.grade || "-"}
                      </span>

                    </div>

                  </div>


                  <button
                    onClick={() =>
                      handleDelete(
                        result._id
                      )
                    }
                    style={{
                      marginTop: "12px",
                      padding: "8px 14px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default TeacherResults;