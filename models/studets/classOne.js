const mongoose = require("mongoose");
const classOneSchema = mongoose.Schema({
  className: { type: String, require: true },
  examSession: { type: String, require: true },
  studentName: { type: String, require: true },
  studentFatherName: { type: String, require: true },
  studentRollNumber: { type: String, required: true },
  marks: { type: Array, require: true },
  finalMarks: { type: String, require: true },
  totalMarks: { type: String, require: true },
  result: { type: String, require: true },
});

classOneSchema.index(
  { studentRollNumber: 1, examSession: 1 },
  { unique: true }
);
const classOne = mongoose.model("result", classOneSchema);
module.exports = classOne;
