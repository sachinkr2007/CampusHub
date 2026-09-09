const Exam = require("../models/Exam");

// ===============================
// GET ALL EXAMS
// ===============================
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("student")
      .sort({ examDate: 1 });

    res.json(exams);

  } catch (error) {
    console.error(
      "Get exams error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch exams",
    });
  }
};


// ===============================
// GET EXAMS BY STUDENT
// ===============================
const getExamsByStudent = async (
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

    const exams = await Exam.find({
      student: studentId,
    })
      .populate("student")
      .sort({ examDate: 1 });

    res.json(exams);

  } catch (error) {
    console.error(
      "Get student exams error:",
      error
    );

    res.status(500).json({
      error:
        "Failed to fetch student exams",
    });
  }
};


// ===============================
// GET SINGLE EXAM
// ===============================
const getExamById = async (
  req,
  res
) => {
  try {
    const exam =
      await Exam.findById(
        req.params.id
      ).populate("student");

    if (!exam) {
      return res.status(404).json({
        error: "Exam not found",
      });
    }

    res.json(exam);

  } catch (error) {
    console.error(
      "Get exam error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch exam",
    });
  }
};


// ===============================
// CREATE EXAM
// ===============================
const createExam = async (
  req,
  res
) => {
  try {
    const {
      student,
      subject,
      examName,
      examDate,
      examTime,
      room,
      type,
    } = req.body;

    if (
      !student ||
      !subject ||
      !examName ||
      !examDate ||
      !examTime ||
      !room
    ) {
      return res.status(400).json({
        error:
          "Student, subject, exam name, date, time and room are required",
      });
    }

    const exam =
      await Exam.create({
        student,
        subject,
        examName,
        examDate,
        examTime,
        room,
        type:
          type || "End Semester",
      });

    const populatedExam =
      await Exam.findById(
        exam._id
      ).populate("student");

    res.status(201).json(
      populatedExam
    );

  } catch (error) {
    console.error(
      "Create exam error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// UPDATE EXAM
// ===============================
const updateExam = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const exam =
      await Exam.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("student");

    if (!exam) {
      return res.status(404).json({
        error: "Exam not found",
      });
    }

    res.json(exam);

  } catch (error) {
    console.error(
      "Update exam error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE EXAM
// ===============================
const deleteExam = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const exam =
      await Exam.findByIdAndDelete(
        id
      );

    if (!exam) {
      return res.status(404).json({
        error: "Exam not found",
      });
    }

    res.json({
      message:
        "Exam deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete exam error:",
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
  getExams,
  getExamsByStudent,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
};