const Event = require("../models/Event");

// ===============================
// GET ALL EVENTS
// ===============================
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      error: "Failed to fetch events",
    });
  }
};


// ===============================
// GET SINGLE EVENT
// ===============================
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    console.error("Get event error:", error);

    res.status(500).json({
      error: "Failed to fetch event",
    });
  }
};


// ===============================
// CREATE EVENT
// ===============================
const createEvent = async (req, res) => {
  try {
    const {
      date,
      type,
      title,
      description,
      location,
      time,
    } = req.body;

    if (!date || !type || !title || !location || !time) {
      return res.status(400).json({
        error: "Date, type, title, location and time are required",
      });
    }

    const event = await Event.create({
      date,
      type,
      title,
      description: description || "",
      location,
      time,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// UPDATE EVENT
// ===============================
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    console.error("Update event error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE EVENT
// ===============================
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// EXPORT
// ===============================
module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};