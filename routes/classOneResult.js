const express = require("express");
const Class = require("../models/studets/classOne");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
router.post("/addnewresult", async (req, res) => {
  const {
    className,
    studentName,
    studentFatherName,
    studentRollNumber,
    marks,
    finalMarks,
    totalMarks,
    result,
    examSession,
  } = req.body;

  try {
    // Check if a result with the same roll number and exam session already exists
    const existingResult = await Class.findOne({
      studentRollNumber,
      examSession,
    });

    if (existingResult) {
      // If a result already exists for the same roll number and exam session, send an error response
      return res.status(400).json({
        message:
          "A result for this roll number already exists for the same exam session.",
      });
    }

    // If no existing result found, create a new result
    const newResult = await Class.create({
      className,
      studentName,
      studentFatherName,
      studentRollNumber,
      marks,
      finalMarks,
      totalMarks,
      result,
      examSession,
    });

    res.status(200).json({ message: "Result added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all results
router.get("/allresults", async (req, res) => {
  try {
    const results = await Class.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
// find result on class basis
router.post("/result", async (req, res) => {
  const { className, examSession } = req.body;
  console.log(req.body);
  try {
    if (!className && !examSession) {
      res
        .status(400)
        .json({ message: "please provide class name and exam session" });
    } else {
      const result = await Class.find({ className, examSession });
      console.log(result);
      if (result) {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
// update the single student result
router.put("/result/:id", async (req, res) => {
  const {
    studentName,
    studentFatherName,
    studentRollNumber,
    marks,
    finalMarks,
    totalMarks,
    result,
  } = req.body;
  console.log(req.body);
  try {
    const singleStudent = await Class.findByIdAndUpdate(
      { _id: req.params.id },
      {
        studentName,
        studentFatherName,
        studentRollNumber,
        marks,
        finalMarks,
        totalMarks,
        result,
      }
    );
    res.status(200).json(singleStudent);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
// to fetch the single user result
router.post("/singleresult", async (req, res) => {
  const {
    studentName,
    studentFatherName,
    studentRollNumber,
    className,
    examSession,
  } = req.body;
  console.log(req.body);
  try {
    const singleStudentResult = await Class.findOne({
      studentRollNumber,
      examSession
    });
    console.log(singleStudentResult);
    if (
      singleStudentResult.studentName !== studentName ||
      singleStudentResult.studentFatherName !== studentFatherName ||
      singleStudentResult.className !== className
    ) {
      res.status(400).json({ message: "invalid data" });
    } else {
      console.log(singleStudentResult);
      res.status(200).json(singleStudentResult);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
// to delete single student result
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteResult = await Class.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "result deleted successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = router;
