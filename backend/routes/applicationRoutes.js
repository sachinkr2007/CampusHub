const express = require("express");

const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

const router = express.Router();

// GET all applications
router.get("/", getApplications);

// GET single application
router.get("/:id", getApplicationById);

// CREATE application
router.post("/", createApplication);

// UPDATE application
router.put("/:id", updateApplication);

// DELETE application
router.delete("/:id", deleteApplication);

module.exports = router;