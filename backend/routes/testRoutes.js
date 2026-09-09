const express = require("express");
const Test = require("../models/Test");

const router = express.Router();

// GET - data read karna
router.get("/", async (req, res) => {
  try {
    const data = await Test.find();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message
    });
  }
});

// POST - data save karna
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    const newTest = new Test({
      name,
      message
    });

    const savedData = await newTest.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({
      message: "Error saving data",
      error: error.message
    });
  }
});

module.exports = router;