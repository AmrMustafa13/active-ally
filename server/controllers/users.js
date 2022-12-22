const User = require("../models/user");
const mongoose = require("mongoose");

const loginUser = (req, res) => {
  res.json("Login");
};

const signupUser = (req, res) => {
  res.json("Signup");
};

module.exports = {
  loginUser,
  signupUser,
};
