const express = require("express");

const {
  createStudent,
  getStudents,
  loginStudent,
  updateStudent,
  deleteStudent,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/studentController");

const router = express.Router();


// GET ALL USERS
router.get("/", getStudents);


// LOGIN
router.post("/login", loginStudent);


// FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);


// CREATE USER
router.post("/", createStudent);


// UPDATE USER
router.put("/:id", updateStudent);


// DELETE USER
router.delete("/:id", deleteStudent);


module.exports = router;