const Assignment = require("../models/Assignment");

// ===============================
// GET ALL ASSIGNMENTS
// ===============================
const getAssignments = async (req, res) => {
  try {
    const assignments =
      await Assignment.find()
        .sort({ dueDate: 1 });

    res.json(assignments);

  } catch (error) {
    console.error(
      "Get assignments error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch assignments",
    });
  }
};


// ===============================
// GET ASSIGNMENTS BY STUDENT
// ===============================
const getAssignmentsByStudent = async (
  req,
  res
) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        error: "Student ID is required",
      });
    }

    const assignments =
      await Assignment.find({
        student: studentId,
      }).sort({
        dueDate: 1,
      });

    res.json(assignments);

  } catch (error) {
    console.error(
      "Get student assignments error:",
      error
    );

    res.status(500).json({
      error:
        "Failed to fetch student assignments",
    });
  }
};


// ===============================
// GET SINGLE ASSIGNMENT
// ===============================
const getAssignmentById = async (
  req,
  res
) => {
  try {
    const assignment =
      await Assignment.findById(
        req.params.id
      );

    if (!assignment) {
      return res.status(404).json({
        error: "Assignment not found",
      });
    }

    res.json(assignment);

  } catch (error) {
    console.error(
      "Get assignment error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch assignment",
    });
  }
};


// ===============================
// CREATE ASSIGNMENT
// ===============================
const createAssignment = async (
  req,
  res
) => {
  try {
    const {
      student,
      subject,
      title,
      dueDate,
      status,
      description,
    } = req.body;

    if (
      !student ||
      !subject ||
      !title ||
      !dueDate
    ) {
      return res.status(400).json({
        error:
          "Student, subject, title and due date are required",
      });
    }

    const assignment =
      await Assignment.create({
        student,
        subject,
        title,
        dueDate,
        status:
          status || "Pending",
        description:
          description || "",
      });

    res.status(201).json(
      assignment
    );

  } catch (error) {
    console.error(
      "Create assignment error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// UPDATE ASSIGNMENT
// ===============================
const updateAssignment = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const assignment =
      await Assignment.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!assignment) {
      return res.status(404).json({
        error: "Assignment not found",
      });
    }

    res.json(assignment);

  } catch (error) {
    console.error(
      "Update assignment error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE ASSIGNMENT
// ===============================
const deleteAssignment = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const assignment =
      await Assignment.findByIdAndDelete(
        id
      );

    if (!assignment) {
      return res.status(404).json({
        error: "Assignment not found",
      });
    }

    res.json({
      message:
        "Assignment deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete assignment error:",
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
  getAssignments,
  getAssignmentsByStudent,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};