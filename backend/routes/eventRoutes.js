const express = require("express");

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

// GET all events
router.get("/", getEvents);

// GET single event
router.get("/:id", getEventById);

// CREATE event
router.post("/", createEvent);

// UPDATE event
router.put("/:id", updateEvent);

// DELETE event
router.delete("/:id", deleteEvent);

module.exports = router;