// models/Admission.js
const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  selectedClass: {
    type: String,
    required: true,
    enum: [
      "Class One",
      "Class Two",
      "Class Three",
      "Class Four",
      "Class Five",
      "Class Six",
      "Class Seven",
      "Class Eight",
      "Class Nine",
      "Class Ten",
    ],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,

    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  admissionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admission", admissionSchema);
