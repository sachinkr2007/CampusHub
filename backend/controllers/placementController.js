const Placement = require("../models/Placement");

// ===============================
// GET ALL PLACEMENTS
// ===============================
const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });

    res.json(placements);
  } catch (error) {
    console.error("Get placements error:", error);

    res.status(500).json({
      error: "Failed to fetch placements",
    });
  }
};


// ===============================
// GET SINGLE PLACEMENT
// ===============================
const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        error: "Placement not found",
      });
    }

    res.json(placement);
  } catch (error) {
    console.error("Get placement error:", error);

    res.status(500).json({
      error: "Failed to fetch placement",
    });
  }
};


// ===============================
// CREATE PLACEMENT
// ===============================
const createPlacement = async (req, res) => {
  try {
    const {
      company,
      role,
      type,
      location,
      package: packageName,
      eligibility,
    } = req.body;

    if (
      !company ||
      !role ||
      !type ||
      !location ||
      !packageName ||
      !eligibility
    ) {
      return res.status(400).json({
        error: "All placement fields are required",
      });
    }

    const placement = await Placement.create({
      company,
      role,
      type,
      location,
      package: packageName,
      eligibility,
    });

    res.status(201).json(placement);
  } catch (error) {
    console.error("Create placement error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// UPDATE PLACEMENT
// ===============================
const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;

    const placement = await Placement.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!placement) {
      return res.status(404).json({
        error: "Placement not found",
      });
    }

    res.json(placement);
  } catch (error) {
    console.error("Update placement error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE PLACEMENT
// ===============================
const deletePlacement = async (req, res) => {
  try {
    const { id } = req.params;

    const placement = await Placement.findByIdAndDelete(id);

    if (!placement) {
      return res.status(404).json({
        error: "Placement not found",
      });
    }

    res.json({
      message: "Placement deleted successfully",
    });
  } catch (error) {
    console.error("Delete placement error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// EXPORT
// ===============================
module.exports = {
  getPlacements,
  getPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
};