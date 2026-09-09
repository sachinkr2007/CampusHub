const express = require("express");

const {
  getPlacements,
  getPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
} = require("../controllers/placementController");

const router = express.Router();

// GET all placements
router.get("/", getPlacements);

// GET single placement
router.get("/:id", getPlacementById);

// CREATE placement
router.post("/", createPlacement);

// UPDATE placement
router.put("/:id", updatePlacement);

// DELETE placement
router.delete("/:id", deletePlacement);

module.exports = router;