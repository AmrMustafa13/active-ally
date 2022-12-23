const userSchema = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  });

  return token;
};

const loginUser = async (req, res) => {
  res.json("Login");
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  // inputs validation
  if (!email || !password)
    return res.status(400).json({ error: "All fields must be filled" });

  if (!validator.isEmail(email))
    return res.status(400).json({ error: "Email is not valid" });

  if (!validator.isStrongPassword(password))
    return res.status(400).json({ error: "Password is not strong enough" });

  // check if email already exists
  const exists = await userSchema.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already exists" });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // saving the user to the database
  try {
    const newSavedUser = await userSchema.create({
      email,
      password: hashedPassword,
    });
    const token = createToken(newSavedUser._id);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
