const Timetable = require("../models/Timetable");

// ===============================
// GET ALL TIMETABLE CLASSES
// ===============================
const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find()
      .populate("student")
      .sort({ day: 1, time: 1 });

    res.json(timetable);
  } catch (error) {
    console.error(
      "Get timetable error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch timetable",
    });
  }
};


// ===============================
// GET TIMETABLE BY STUDENT
// ===============================
const getTimetableByStudent = async (
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

    const timetable =
      await Timetable.find({
        student: studentId,
      })
        .populate("student")
        .sort({
          day: 1,
          time: 1,
        });

    res.json(timetable);
  } catch (error) {
    console.error(
      "Get student timetable error:",
      error
    );

    res.status(500).json({
      error:
        "Failed to fetch student timetable",
    });
  }
};


// ===============================
// GET SINGLE CLASS
// ===============================
const getTimetableById = async (
  req,
  res
) => {
  try {
    const timetable =
      await Timetable.findById(
        req.params.id
      ).populate("student");

    if (!timetable) {
      return res.status(404).json({
        error:
          "Timetable entry not found",
      });
    }

    res.json(timetable);
  } catch (error) {
    console.error(
      "Get timetable entry error:",
      error
    );

    res.status(500).json({
      error:
        "Failed to fetch timetable entry",
    });
  }
};


// ===============================
// CREATE CLASS
// ===============================
const createTimetable = async (
  req,
  res
) => {
  try {
    const {
      student,
      day,
      time,
      subject,
      room,
    } = req.body;

    if (
      !student ||
      !day ||
      !time ||
      !subject ||
      !room
    ) {
      return res.status(400).json({
        error:
          "Student, day, time, subject and room are required",
      });
    }

    const timetable =
      await Timetable.create({
        student,
        day,
        time,
        subject,
        room,
      });

    const populatedTimetable =
      await Timetable.findById(
        timetable._id
      ).populate("student");

    res.status(201).json(
      populatedTimetable
    );
  } catch (error) {
    console.error(
      "Create timetable error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// UPDATE CLASS
// ===============================
const updateTimetable = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const timetable =
      await Timetable.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("student");

    if (!timetable) {
      return res.status(404).json({
        error:
          "Timetable entry not found",
      });
    }

    res.json(timetable);
  } catch (error) {
    console.error(
      "Update timetable error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE CLASS
// ===============================
const deleteTimetable = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const timetable =
      await Timetable.findByIdAndDelete(
        id
      );

    if (!timetable) {
      return res.status(404).json({
        error:
          "Timetable entry not found",
      });
    }

    res.json({
      message:
        "Timetable entry deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete timetable error:",
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
  getTimetable,
  getTimetableByStudent,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
};