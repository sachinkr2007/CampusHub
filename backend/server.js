require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());


// ===============================
// Routes
// ===============================

// Test Routes
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Student Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// Attendance Routes
const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);

// Assignment Routes
const assignmentRoutes = require("./routes/assignmentRoutes");
app.use("/api/assignments", assignmentRoutes);

// Placement Routes
const placementRoutes = require("./routes/placementRoutes");
app.use("/api/placements", placementRoutes);

// Application Routes
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

// Event Routes
const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);

// Event Registration Routes
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");
app.use("/api/event-registrations", eventRegistrationRoutes);

// Exam Routes
const examRoutes = require("./routes/examRoutes");
app.use("/api/exams", examRoutes);

// Result Routes
const resultRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultRoutes);

// Timetable Routes
const timetableRoutes = require("./routes/timetableRoutes");
app.use("/api/timetable", timetableRoutes);


// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    message: "CampusHub Backend is running!"
  });
});


// ===============================
// Server & Database
// ===============================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});