const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // ===============================
    // PASSWORD
    // ===============================
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    rollNo: {
       type: String,
       required: function () {
       return this.role === "student";
      },
       unique: true,
       sparse: true,
       trim: true,
      },

    course: {
    type: String,
    required: function () {
    return this.role === "student";
    },
     trim: true,
   },

    year: {
      type: Number,
      required: function () {
       return this.role === "student";
      },
    },

    skills: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);