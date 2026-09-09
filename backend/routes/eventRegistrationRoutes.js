const express = require("express");

const {
  getEventRegistrations,
  getEventRegistrationById,
  createEventRegistration,
  deleteEventRegistration,
} = require("../controllers/eventRegistrationController");

const router = express.Router();

// GET all registrations
router.get("/", getEventRegistrations);

// GET single registration
router.get("/:id", getEventRegistrationById);

// CREATE registration
router.post("/", createEventRegistration);

// DELETE registration
router.delete("/:id", deleteEventRegistration);

module.exports = router;