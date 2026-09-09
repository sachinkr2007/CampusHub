const Result = require("../models/Result");

// ===============================
// GET ALL RESULTS
// ===============================
const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student")
      .sort({ semester: 1, subject: 1 });

    res.json(results);

  } catch (error) {
    console.error(
      "Get results error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch results",
    });
  }
};


// ===============================
// GET RESULTS BY STUDENT
// ===============================
const getResultsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        error: "Student ID is required",
      });
    }

    const results = await Result.find({
      student: studentId,
    })
      .populate("student")
      .sort({
        semester: 1,
        subject: 1,
      });

    res.json(results);

  } catch (error) {
    console.error(
      "Get student results error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch student results",
    });
  }
};


// ===============================
// GET SINGLE RESULT
// ===============================
const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(
      req.params.id
    ).populate("student");

    if (!result) {
      return res.status(404).json({
        error: "Result not found",
      });
    }

    res.json(result);

  } catch (error) {
    console.error(
      "Get result error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch result",
    });
  }
};


// ===============================
// CREATE RESULT
// ===============================
const createResult = async (req, res) => {
  try {
    const {
      student,
      subject,
      marks,
      totalMarks,
      grade,
      semester,
    } = req.body;

    if (
      !student ||
      !subject ||
      marks === undefined ||
      !totalMarks ||
      !semester
    ) {
      return res.status(400).json({
        error:
          "Student, subject, marks, total marks and semester are required",
      });
    }

    if (marks > totalMarks) {
      return res.status(400).json({
        error:
          "Marks cannot be greater than total marks",
      });
    }

    const result = await Result.create({
      student,
      subject,
      marks,
      totalMarks,
      grade: grade || "",
      semester,
    });

    const populatedResult =
      await Result.findById(
        result._id
      ).populate("student");

    res.status(201).json(
      populatedResult
    );

  } catch (error) {
    console.error(
      "Create result error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// UPDATE RESULT
// ===============================
const updateResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result =
      await Result.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("student");

    if (!result) {
      return res.status(404).json({
        error: "Result not found",
      });
    }

    res.json(result);

  } catch (error) {
    console.error(
      "Update result error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE RESULT
// ===============================
const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result =
      await Result.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        error: "Result not found",
      });
    }

    res.json({
      message:
        "Result deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete result error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// EXPORT
// ===============================
module.exports = {
  getResults,
  getResultsByStudent,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
};