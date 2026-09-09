const express = require("express");

const {
  getResults,
  getResultsByStudent,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
} = require("../controllers/resultController");

const router = express.Router();


// ===============================
// GET ALL RESULTS
// ===============================

router.get("/", getResults);


// ===============================
// GET RESULTS BY STUDENT
// ===============================

router.get(
  "/student/:studentId",
  getResultsByStudent
);


// ===============================
// GET SINGLE RESULT
// ===============================

router.get("/:id", getResultById);


// ===============================
// CREATE RESULT
// ===============================

router.post("/", createResult);


// ===============================
// UPDATE RESULT
// ===============================

router.put("/:id", updateResult);


// ===============================
// DELETE RESULT
// ===============================

router.delete("/:id", deleteResult);


module.exports = router;