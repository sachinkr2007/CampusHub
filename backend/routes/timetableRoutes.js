const express = require("express");

const {
  getTimetable,
  getTimetableByStudent,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
} = require("../controllers/timetableController");

const router = express.Router();


// ===============================
// GET ALL TIMETABLE CLASSES
// ===============================

router.get(
  "/",
  getTimetable
);


// ===============================
// GET TIMETABLE BY STUDENT
// ===============================

router.get(
  "/student/:studentId",
  getTimetableByStudent
);


// ===============================
// GET SINGLE TIMETABLE CLASS
// ===============================

router.get(
  "/:id",
  getTimetableById
);


// ===============================
// CREATE TIMETABLE CLASS
// ===============================

router.post(
  "/",
  createTimetable
);


// ===============================
// UPDATE TIMETABLE CLASS
// ===============================

router.put(
  "/:id",
  updateTimetable
);


// ===============================
// DELETE TIMETABLE CLASS
// ===============================

router.delete(
  "/:id",
  deleteTimetable
);


module.exports = router;