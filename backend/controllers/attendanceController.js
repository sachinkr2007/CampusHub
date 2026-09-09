const Attendance = require("../models/Attendance");

// ===============================
// MARK ATTENDANCE
// ===============================
const markAttendance = async (req, res) => {
  try {
    const { student, date, status } = req.body;

    if (!student || !date || !status) {
      return res.status(400).json({
        error: "Student, date and status are required",
      });
    }

    const attendance = await Attendance.create({
      student,
      date,
      status,
    });

    const populatedAttendance =
      await Attendance.findById(
        attendance._id
      ).populate("student");

    res.status(201).json(
      populatedAttendance
    );

  } catch (error) {
    console.error(
      "Mark attendance error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// GET ALL ATTENDANCE
// ===============================
const getAttendance = async (req, res) => {
  try {
    const attendance =
      await Attendance.find()
        .populate("student")
        .sort({ date: -1 });

    res.json(attendance);

  } catch (error) {
    console.error(
      "Get attendance error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// GET ATTENDANCE BY STUDENT
// ===============================
const getAttendanceByStudent = async (
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

    const attendance =
      await Attendance.find({
        student: studentId,
      })
        .populate("student")
        .sort({ date: -1 });

    res.json(attendance);

  } catch (error) {
    console.error(
      "Get student attendance error:",
      error
    );

    res.status(500).json({
      error:
        "Failed to fetch student attendance",
    });
  }
};


// ===============================
// UPDATE ATTENDANCE
// ===============================
const updateAttendance = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status, date } = req.body;

    const attendance =
      await Attendance.findByIdAndUpdate(
        id,
        {
          status,
          date,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate("student");

    if (!attendance) {
      return res.status(404).json({
        error:
          "Attendance record not found",
      });
    }

    res.json(attendance);

  } catch (error) {
    console.error(
      "Update attendance error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE ATTENDANCE
// ===============================
const deleteAttendance = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const attendance =
      await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({
        error:
          "Attendance record not found",
      });
    }

    res.json({
      message:
        "Attendance deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete attendance error:",
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
  markAttendance,
  getAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
};