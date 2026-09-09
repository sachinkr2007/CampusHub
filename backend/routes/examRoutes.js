const express = require("express");

const {
  getExams,
  getExamsByStudent,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} = require("../controllers/examController");

const router = express.Router();


// ===============================
// GET ALL EXAMS
// ===============================

router.get(
  "/",
  getExams
);


// ===============================
// GET EXAMS BY STUDENT
// ===============================

router.get(
  "/student/:studentId",
  getExamsByStudent
);


// ===============================
// GET SINGLE EXAM
// ===============================

router.get(
  "/:id",
  getExamById
);


// ===============================
// CREATE EXAM
// ===============================

router.post(
  "/",
  createExam
);


// ===============================
// UPDATE EXAM
// ===============================

router.put(
  "/:id",
  updateExam
);


// ===============================
// DELETE EXAM
// ===============================

router.delete(
  "/:id",
  deleteExam
);


module.exports = router;