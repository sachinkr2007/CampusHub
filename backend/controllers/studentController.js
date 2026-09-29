require("dotenv").config();
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const PasswordReset = require("../models/PasswordReset");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// ===============================
// CREATE USER / REGISTER
// ===============================
const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      course,
      year,
      skills,
      role,
      rollNo,
    } = req.body;

    // ===============================
    // VALIDATION
    // ===============================
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const isTeacher = role === "teacher";

    if (!isTeacher && (!course || year === undefined)) {
      return res.status(400).json({
        message: "Course and year are required for student registration",
      });
    }

    // ===============================
    // CHECK EXISTING EMAIL
    // ===============================
    const existingUser = await Student.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // ===============================
    // HASH PASSWORD
    // ===============================
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // ===============================
    // GENERATE ROLL NUMBER
    // ===============================
    let finalRollNo = undefined;

    if (!isTeacher) {
      if (rollNo && rollNo.trim()) {
        finalRollNo = rollNo.trim();
      } else {
        finalRollNo = `STU-${Date.now()}`;
      }
    }

    // ===============================
    // CREATE USER
    // ===============================
    const user = await Student.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      course: isTeacher ? (course ? course.trim() : "Faculty") : course.trim(),
      year: isTeacher ? (year !== undefined ? Number(year) : 0) : Number(year),
      skills: Array.isArray(skills) ? skills : [],
      role: isTeacher ? "teacher" : "student",
      rollNo: finalRollNo,
    });

    // ===============================
    // RESPONSE WITHOUT PASSWORD
    // ===============================
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      course: user.course,
      year: user.year,
      skills: user.skills,
      role: user.role,
      rollNo: user.rollNo,
    };

    res.status(201).json({
      message: "Account created successfully",
      user: userResponse,
    });

  } catch (error) {
    console.error(
      "Create user error:",
      error
    );

    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "Email or roll number already exists",
      });
    }

    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};


// ===============================
// GET ALL STUDENTS
// ===============================
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      role: "student",
    })
      .select("-password")
      .sort({
        rollNo: 1,
      });

    res.json(students);

  } catch (error) {
    console.error(
      "Get students error:",
      error
    );

    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};


// ===============================
// LOGIN
// ===============================
const loginStudent = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    // ===============================
    // VALIDATION
    // ===============================
    if (!email || !password || !role) {
      return res.status(400).json({
        message:
          "Email, password and role are required",
      });
    }

    // ===============================
    // CHECK ROLE
    // ===============================
    if (!["student", "teacher"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // ===============================
    // FIND USER
    // ===============================
    const user = await Student.findOne({
      email: email.trim().toLowerCase(),
      role: role,
    });

    if (!user) {
      return res.status(404).json({
        message: `${role} account not found`,
      });
    }

    // ===============================
    // CHECK PASSWORD EXISTS
    // ===============================
    if (!user.password) {
      return res.status(400).json({
        message:
          "Password is not set for this account. Please create a new password.",
      });
    }

    // ===============================
    // COMPARE PASSWORD
    // ===============================
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // ===============================
    // CREATE JWT TOKEN
    // ===============================
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ===============================
    // USER DATA
    // ===============================
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      course: user.course,
      year: user.year,
      skills: user.skills,
      role: user.role,
      rollNo: user.rollNo,
    };

    // ===============================
    // LOGIN SUCCESS
    // ===============================
    res.json({
      message: "Login successful",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
};


// ===============================
// UPDATE USER
// ===============================
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    // ===============================
    // PASSWORD UPDATE
    // ===============================
    if (updateData.password) {

      if (
        updateData.password.length < 6
      ) {
        return res.status(400).json({
          message:
            "Password must be at least 6 characters",
        });
      }

      updateData.password =
        await bcrypt.hash(
          updateData.password,
          10
        );
    }

    // Never save confirmPassword
    delete updateData.confirmPassword;

    // ===============================
    // UPDATE USER
    // ===============================
    const updatedStudent =
      await Student.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ===============================
    // RESPONSE
    // ===============================
    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      email: updatedStudent.email,
      course: updatedStudent.course,
      year: updatedStudent.year,
      skills: updatedStudent.skills,
      role: updatedStudent.role,
      rollNo: updatedStudent.rollNo,
    });

  } catch (error) {
    console.error(
      "Update user error:",
      error
    );

    res.status(500).json({
      message:
        "Error updating user",
      error: error.message,
    });
  }
};


// ===============================
// DELETE USER
// ===============================
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent =
      await Student.findByIdAndDelete(
        req.params.id
      );

    if (!deletedStudent) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message:
        "User deleted successfully",

      user: {
        _id: deletedStudent._id,
        name: deletedStudent.name,
        email: deletedStudent.email,
        role: deletedStudent.role,
      },
    });

  } catch (error) {
    console.error(
      "Delete user error:",
      error
    );

    res.status(500).json({
      message:
        "Error deleting user",
      error: error.message,
    });
  }
};


// ===============================
// FORGOT PASSWORD
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // ===============================
    // VALIDATION
    // ===============================
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // ===============================
    // FIND USER
    // ===============================
    const user = await Student.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message:
          "No account found with this email",
      });
    }

    // ===============================
    // GENERATE 6 DIGIT OTP
    // ===============================
    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    // OTP valid for 10 minutes
    const expiresAt =
      new Date(
        Date.now() +
        10 * 60 * 1000
      );

    // ===============================
    // DELETE OLD OTP
    // ===============================
    await PasswordReset.deleteMany({
      email: normalizedEmail,
    });

    // ===============================
    // SAVE NEW OTP
    // ===============================
    await PasswordReset.create({
      email: normalizedEmail,
      otp,
      expiresAt,
    });

    // ===============================
    // SEND OTP EMAIL
    // ===============================
    await sendEmail(
      normalizedEmail,
      "CampusHub Password Reset OTP",
      `Your CampusHub password reset OTP is ${otp}.

This OTP is valid for 10 minutes.

If you did not request a password reset, please ignore this email.`
    );

    res.json({
      message:
        "OTP sent successfully to your email",
    });

  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to send password reset OTP",
      error: error.message,
    });
  }
};


// ===============================
// VERIFY OTP
// ===============================
const verifyOTP = async (req, res) => {
  try {
    const {
      email,
      otp,
    } = req.body;

    // ===============================
    // VALIDATION
    // ===============================
    if (!email || !otp) {
      return res.status(400).json({
        message:
          "Email and OTP are required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // ===============================
    // FIND OTP
    // ===============================
    const resetData =
      await PasswordReset.findOne({
        email: normalizedEmail,
        otp: otp.toString().trim(),
      });

    if (!resetData) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // ===============================
    // CHECK EXPIRY
    // ===============================
    if (
      resetData.expiresAt <
      new Date()
    ) {
      await PasswordReset.deleteOne({
        _id: resetData._id,
      });

      return res.status(400).json({
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    // ===============================
    // OTP VERIFIED
    // ===============================
    res.json({
      message:
        "OTP verified successfully",
    });

  } catch (error) {
    console.error(
      "Verify OTP error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to verify OTP",
      error: error.message,
    });
  }
};


// ===============================
// RESET PASSWORD
// ===============================
const resetPassword = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // ===============================
    // VALIDATION
    // ===============================
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and new password are required",
      });
    }

    // ===============================
    // PASSWORD LENGTH
    // ===============================
    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    // ===============================
    // NORMALIZE EMAIL
    // ===============================
    const normalizedEmail =
      email.trim().toLowerCase();

    // ===============================
    // FIND USER
    // ===============================
    const user = await Student.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ===============================
    // HASH NEW PASSWORD
    // ===============================
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // ===============================
    // UPDATE PASSWORD
    // ===============================
    user.password = hashedPassword;

    await user.save();

    // ===============================
    // DELETE OTP
    // ===============================
    await PasswordReset.deleteMany({
      email: normalizedEmail,
    });

    // ===============================
    // SUCCESS
    // ===============================
    res.json({
      message:
        "Password reset successfully. You can now login with your new password.",
    });

  } catch (error) {
    console.error(
      "Reset password error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to reset password",
      error: error.message,
    });
  }
};


// ===============================
// EXPORT
// ===============================
module.exports = {
  createStudent,
  getStudents,
  loginStudent,
  updateStudent,
  deleteStudent,
  forgotPassword,
  verifyOTP,
  resetPassword,
};