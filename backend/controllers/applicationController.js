const Application = require("../models/Application");

// ===============================
// GET ALL APPLICATIONS
// ===============================
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    console.error("Get applications error:", error);

    res.status(500).json({
      error: "Failed to fetch applications",
    });
  }
};


// ===============================
// GET SINGLE APPLICATION
// ===============================
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.json(application);
  } catch (error) {
    console.error("Get application error:", error);

    res.status(500).json({
      error: "Failed to fetch application",
    });
  }
};


// ===============================
// CREATE APPLICATION
// ===============================
const createApplication = async (req, res) => {
  try {
    const {
      studentName,
      email,
      phone,
      company,
      role,
    } = req.body;

    if (
      !studentName ||
      !email ||
      !phone ||
      !company ||
      !role
    ) {
      return res.status(400).json({
        error:
          "Student name, email, phone, company and role are required",
      });
    }

    const application = await Application.create({
      studentName,
      email,
      phone,
      company,
      role,
      status: "Applied",
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Create application error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// UPDATE APPLICATION
// ===============================
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application =
      await Application.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!application) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.json(application);
  } catch (error) {
    console.error("Update application error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// DELETE APPLICATION
// ===============================
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application =
      await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete application error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// ===============================
// EXPORT
// ===============================
module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};