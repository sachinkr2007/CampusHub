const express = require("express");

const {
  getAssignments,
  getAssignmentsByStudent,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

const router = express.Router();


// ===============================
// GET ALL ASSIGNMENTS
// ===============================

router.get(
  "/",
  getAssignments
);


// ===============================
// GET ASSIGNMENTS BY STUDENT
// ===============================

router.get(
  "/student/:studentId",
  getAssignmentsByStudent
);


// ===============================
// GET SINGLE ASSIGNMENT
// ===============================

router.get(
  "/:id",
  getAssignmentById
);


// ===============================
// CREATE ASSIGNMENT
// ===============================

router.post(
  "/",
  createAssignment
);


// ===============================
// UPDATE ASSIGNMENT
// ===============================

router.put(
  "/:id",
  updateAssignment
);


// ===============================
// DELETE ASSIGNMENT
// ===============================

router.delete(
  "/:id",
  deleteAssignment
);


module.exports = router;