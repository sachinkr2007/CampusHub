const express = require("express");

const {
  markAttendance,
  getAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();


// ===============================
// GET ALL ATTENDANCE
// ===============================

router.get("/", getAttendance);


// ===============================
// GET ATTENDANCE BY STUDENT
// ===============================

router.get(
  "/student/:studentId",
  getAttendanceByStudent
);


// ===============================
// MARK ATTENDANCE
// ===============================

router.post("/", markAttendance);


// ===============================
// UPDATE ATTENDANCE
// ===============================

router.put("/:id", updateAttendance);


// ===============================
// DELETE ATTENDANCE
// ===============================

router.delete("/:id", deleteAttendance);


module.exports = router;