const express = require("express");
require("dotenv").config();
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, userName, email, password, isAdmin } = req.body;
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "email already exist" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const securePassword = bcrypt.hashSync(password, 10);
      const newUser = await userModel.create({
        name,
        userName,
        email,
        isAdmin,
        password: securePassword,
      });
      // const data = {
      //   user: newUser.id,
      // };
      // const Token = jwt.sign(data, secret_key);
      res.status(200).json({ message: "added successfull" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userExist = await userModel.findOne({ userName });

    if (!userExist) {
      res.status(400).json({ message: "invalid credentials" });
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!comparePassword) {
        res.status(400).json({ message: "invalid password" });
      }
      const data = {
        user: userExist.id,
      };
      if (userExist.isAdmin) {
        const Token = jwt.sign(data, secret_key);
        res.status(200).json({ message: "login successfull", Token });
      } else {
        res.status(400).json({ message: "dont have the access to login" });
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
