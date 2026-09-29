import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";

function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
  });

  const [submitting, setSubmitting] =
    useState(false);

  const [registeredEvents, setRegisteredEvents] =
    useState([]);


  // ===============================
  // FETCH EVENTS
  // ===============================

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/events`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch events"
        );
      }

      const data = await response.json();

      setEvents(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.error(
        "Event fetch error:",
        err
      );

      setError(
        "Unable to load events."
      );

    } finally {
      setLoading(false);
    }
  };


  // ===============================
  // LOAD EVENTS
  // ===============================

  useEffect(() => {
    fetchEvents();
  }, []);


  // ===============================
  // FORMAT DATE
  // ===============================

  const formatDate = (date) => {
    if (!date) {
      return {
        day: "",
        month: "",
      };
    }

    const newDate = new Date(date);

    return {
      day: newDate.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
        }
      ),

      month: newDate
        .toLocaleDateString(
          "en-GB",
          {
            month: "short",
          }
        )
        .toUpperCase(),
    };
  };


  // ===============================
  // OPEN REGISTRATION FORM
  // ===============================

  const handleRegister = (event) => {
    setSelectedEvent(event);

    // Get logged-in student
    const storedStudent =
      localStorage.getItem("student");

    let student = null;

    if (storedStudent) {
      try {
        student =
          JSON.parse(storedStudent);
      } catch (err) {
        console.error(
          "Invalid student data:",
          err
        );
      }
    }

    setFormData({
      studentName:
        student?.name || "",

      email:
        student?.email || "",

      phone: "",
    });
  };


  // ===============================
  // CLOSE REGISTRATION FORM
  // ===============================

  const closeRegistrationForm = () => {
    setSelectedEvent(null);

    setFormData({
      studentName: "",
      email: "",
      phone: "",
    });
  };


  // ===============================
  // HANDLE INPUT
  // ===============================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ===============================
  // SUBMIT REGISTRATION
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.email ||
      !formData.phone
    ) {
      alert(
        "Please fill all fields."
      );

      return;
    }

    try {
      setSubmitting(true);

      const response =
        await fetch(
          `${API_BASE_URL}/event-registrations`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              eventId:
                selectedEvent._id,

              eventTitle:
                selectedEvent.title,

              studentName:
                formData.studentName,

              email:
                formData.email,

              phone:
                formData.phone,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to register for event"
        );
      }

      setRegisteredEvents(
        (previous) => [
          ...previous,
          selectedEvent._id,
        ]
      );

      alert(
        "Event registration successful! 🎉"
      );

      closeRegistrationForm();

    } catch (err) {
      console.error(
        "Event registration error:",
        err
      );

      alert(
        err.message ||
          "Unable to register for event."
      );

    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="module-page">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="module-header">

        <div>

          <p>
            Student Portal
          </p>

          <h1>
            Campus Events
          </h1>

        </div>

        <span className="job-count">
          {events.length} Upcoming Events
        </span>

      </div>


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
          Loading events...
        </div>

      )}


      {/* ===============================
          ERROR
      =============================== */}

      {!loading &&
        error && (

          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >

            <p>
              {error}
            </p>

            <button
              onClick={
                fetchEvents
              }
              style={{
                marginTop:
                  "10px",
                padding:
                  "8px 16px",
                cursor:
                  "pointer",
              }}
            >
              Try Again
            </button>

          </div>

        )}


      {/* ===============================
          NO EVENTS
      =============================== */}

      {!loading &&
        !error &&
        events.length === 0 && (

          <div
            style={{
              padding: "40px",
              textAlign:
                "center",
            }}
          >

            <h3>
              No events found
            </h3>

            <p>
              There are currently no
              upcoming events.
            </p>

          </div>

        )}


      {/* ===============================
          EVENT LIST
      =============================== */}

      {!loading &&
        !error &&
        events.length > 0 && (

          <div className="student-event-list">

            {events.map((event) => {

              const formattedDate =
                formatDate(
                  event.date
                );

              const isRegistered =
                registeredEvents.includes(
                  event._id
                );

              return (
                <div
                  className="student-event-card"
                  key={event._id}
                >

                  {/* DATE */}

                  <div className="student-event-date">

                    <strong>
                      {
                        formattedDate.day
                      }
                    </strong>

                    <span>
                      {
                        formattedDate.month
                      }
                    </span>

                  </div>


                  {/* EVENT INFORMATION */}

                  <div className="student-event-info">

                    <span>
                      {event.type}
                    </span>

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      {
                        event.description
                      }
                    </p>

                    <small>
                      📍{" "}
                      {event.location}
                      &nbsp; • &nbsp;
                      🕐{" "}
                      {event.time}
                    </small>

                  </div>


                  {/* REGISTER BUTTON */}

                  <button
                    className={
                      isRegistered
                        ? "registered-btn"
                        : "apply-btn"
                    }
                    onClick={() =>
                      handleRegister(
                        event
                      )
                    }
                    disabled={
                      isRegistered
                    }
                  >
                    {isRegistered
                      ? "Registered ✓"
                      : "Register"}
                  </button>

                </div>
              );
            })}

          </div>

        )}


      {/* ===============================
          REGISTRATION MODAL
      =============================== */}

      {selectedEvent && (

        <div
          onClick={
            closeRegistrationForm
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "500px",
              borderRadius:
                "16px",
              padding: "28px",
              boxSizing:
                "border-box",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-start",
                marginBottom:
                  "20px",
              }}
            >

              <div>

                <p
                  style={{
                    margin:
                      "0 0 5px",
                    color:
                      "#2563eb",
                    fontSize:
                      "14px",
                    fontWeight:
                      "600",
                  }}
                >
                  Event Registration
                </p>

                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      "24px",
                  }}
                >
                  {
                    selectedEvent.title
                  }
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 0",
                    color:
                      "#64748b",
                  }}
                >
                  {
                    selectedEvent.type
                  }
                </p>

              </div>


              <button
                type="button"
                onClick={
                  closeRegistrationForm
                }
                style={{
                  border:
                    "none",
                  background:
                    "transparent",
                  fontSize:
                    "28px",
                  cursor:
                    "pointer",
                  color:
                    "#64748b",
                }}
              >
                ×
              </button>

            </div>


            {/* EVENT DETAILS */}

            <div
              style={{
                marginBottom:
                  "20px",
                padding:
                  "12px",
                background:
                  "#f8fafc",
                borderRadius:
                  "8px",
                fontSize:
                  "14px",
              }}
            >
              📍{" "}
              {
                selectedEvent.location
              }

              <br />

              🕐{" "}
              {
                selectedEvent.time
              }

            </div>


            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* NAME */}

              <div
                style={{
                  marginBottom:
                    "16px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  value={
                    formData.studentName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your name"
                  required
                  readOnly
                  style={{
                    width:
                      "100%",
                    padding:
                      "12px",
                    border:
                      "1px solid #dbe3ef",
                    borderRadius:
                      "8px",
                    boxSizing:
                      "border-box",
                    fontSize:
                      "14px",
                    background:
                      "#f8fafc",
                  }}
                />

              </div>


              {/* EMAIL */}

              <div
                style={{
                  marginBottom:
                    "16px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  required
                  readOnly
                  style={{
                    width:
                      "100%",
                    padding:
                      "12px",
                    border:
                      "1px solid #dbe3ef",
                    borderRadius:
                      "8px",
                    boxSizing:
                      "border-box",
                    fontSize:
                      "14px",
                    background:
                      "#f8fafc",
                  }}
                />

              </div>


              {/* PHONE */}

              <div
                style={{
                  marginBottom:
                    "20px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your phone number"
                  required
                  style={{
                    width:
                      "100%",
                    padding:
                      "12px",
                    border:
                      "1px solid #dbe3ef",
                    borderRadius:
                      "8px",
                    boxSizing:
                      "border-box",
                    fontSize:
                      "14px",
                  }}
                />

              </div>


              {/* BUTTONS */}

              <div
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  justifyContent:
                    "flex-end",
                }}
              >

                <button
                  type="button"
                  onClick={
                    closeRegistrationForm
                  }
                  style={{
                    padding:
                      "11px 18px",
                    border:
                      "1px solid #dbe3ef",
                    background:
                      "#fff",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    submitting
                  }
                  style={{
                    padding:
                      "11px 20px",
                    border:
                      "none",
                    background:
                      "#2563eb",
                    color:
                      "#fff",
                    borderRadius:
                      "8px",
                    cursor:
                      submitting
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      submitting
                        ? 0.7
                        : 1,
                  }}
                >
                  {submitting
                    ? "Registering..."
                    : "Register for Event"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default StudentEvents;