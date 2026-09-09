const EventRegistration = require("../models/EventRegistration");

// ===============================
// GET ALL EVENT REGISTRATIONS
// ===============================
const getEventRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find()
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.error("Get event registrations error:", error);

    res.status(500).json({
      error: "Failed to fetch event registrations",
    });
  }
};


// ===============================
// GET SINGLE REGISTRATION
// ===============================
const getEventRegistrationById = async (req, res) => {
  try {
    const registration =
      await EventRegistration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        error: "Registration not found",
      });
    }

    res.json(registration);
  } catch (error) {
    console.error("Get registration error:", error);

    res.status(500).json({
      error: "Failed to fetch registration",
    });
  }
};


// ===============================
// CREATE EVENT REGISTRATION
// ===============================
const createEventRegistration = async (req, res) => {
  try {
    const {
      eventId,
      eventTitle,
      studentName,
      email,
      phone,
    } = req.body;

    if (
      !eventId ||
      !eventTitle ||
      !studentName ||
      !email ||
      !phone
    ) {
      return res.status(400).json({
        error:
          "Event, student name, email and phone are required",
      });
    }

    const registration =
      await EventRegistration.create({
        eventId,
        eventTitle,
        studentName,
        email,
        phone,
        status: "Registered",
      });

    res.status(201).json(registration);
  } catch (error) {
    console.error(
      "Create event registration error:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE REGISTRATION
// ===============================
const deleteEventRegistration = async (req, res) => {
  try {
    const registration =
      await EventRegistration.findByIdAndDelete(
        req.params.id
      );

    if (!registration) {
      return res.status(404).json({
        error: "Registration not found",
      });
    }

    res.json({
      message:
        "Event registration deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete event registration error:",
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
  getEventRegistrations,
  getEventRegistrationById,
  createEventRegistration,
  deleteEventRegistration,
};