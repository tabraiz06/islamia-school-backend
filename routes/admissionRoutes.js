// routes/admissionRoutes.js
const express = require("express");
const router = express.Router();
const Admission = require("../models/Admission");

// Route to add a new admission
router.post("/add", async (req, res) => {
  const {
    studentName,
    fatherName,
    selectedClass,
    dateOfBirth,
    contactNumber,
    email,
    address,
  } = req.body;

  try {
    const newAdmission = new Admission({
      studentName,
      fatherName,
      selectedClass,
      dateOfBirth,
      contactNumber,
      email,
      address,
    });

    await newAdmission.save();
    res
      .status(201)
      .json({
        message: "Admission successfully created",
        admission: newAdmission,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all admissions
router.get("/all", async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get an admission by ID
router.get("/:id", async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an admission by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAdmission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res
      .status(200)
      .json({
        message: "Admission successfully updated",
        admission: updatedAdmission,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete an admission by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.status(200).json({ message: "Admission successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
