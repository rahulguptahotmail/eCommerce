const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let id;
    try {
      id = jwt.verify(token, "secret").id;
    } catch (err) {
      id = null;
    }
    let user = false;
    if (mongoose.isValidObjectId(id)) user = await userModel.findById(id);
    if (user) return next();
    return res.status(403).send({ message: "Invalid credentials" });
  } catch (err) {
    return res.status(500).send({ message: "Invalid credentials" });
  }
};

// admin authorization
const adminAuthorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let id;
    try {
      id = jwt.verify(token, "secret").id;
    } catch (err) {
      id = null;
    }
    let user = false;
    if (mongoose.isValidObjectId(id)) user = await userModel.findById(id);

    if (user?.admin) return next();
    return res.status(403).send({ message: "Invalid credentials" });
  } catch (err) {
    return res.status(500).send({ message: "invalid credentials" });
  }
};

module.exports = { authorization, adminAuthorization };
