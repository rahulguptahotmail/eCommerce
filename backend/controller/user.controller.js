const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptJS = require("bcryptjs");
const { default: mongoose } = require("mongoose");

// login
const login = async (req, res) => {
  try {
    // data from the user
    const { mobile, password } = req.query;

    // validation
    if (!mobile || !password)
      return res.status(403).json({ message: "Invalid mobile or password" });

    // find user present or not
    const user = await userModel.findOne({ mobile });

    // if user not present
    if (!user)
      return res.status(403).json({ message: "Mobile Number Not Register" });

    // password checking
    const passwordStatus = bcryptJS.compareSync(password, user.password);

    // password true or false
    if (!passwordStatus)
      return res.status(403).json({ message: "Invalid password" });

    // token creation
    const token = jwt.sign({ id: user._id }, "secret");

    // send response with cookie setup
    res
      .status(200)
      .cookie("token", token)
      .json({ message: "login successful", token });
  } catch (err) {
    return res.status(500).send({ message: "try Again" });
  }
};

// register
// new controller
const register = async (req, res) => {
  try {
    // data from the user
    const { fullName, mobile, password } = req.body;

    // validation
    if (!fullName || !mobile || !password)
      return res.status(403).json({ message: "Invalid mobile or password" });

    // find user present or not present
    const user = await userModel.findOne({ mobile });

    // if user present then return
    if (user)
      return res.status(403).json({ message: "User already registered" });

    // password hashing
    const hashedPassword = bcryptJS.hashSync(password, 10);

    // create new user
    const newUser = await userModel.create({
      fullName,
      mobile,
      password: hashedPassword,
    });

    // save user in Database
    await newUser.save();

    // token creation
    const token = jwt.sign({ id: newUser._id }, "secret");

    // set token in cookie
    res.cookie("token", token);
    // send response
    return res.status(201).json({ message: "Registration Successfull", token });
  } catch (err) {
    return res.status(500).send({ message: "Try Again" });
  }
};

// change admin controll
const changeAdmin = async (req, res) => {
  const token = req.query.id;
  let id = null;
  try {
    id = jwt.verify(token, "secret").id;
  } catch (err) {
    id = null;
  }
  if (mongoose.isValidObjectId(id))
    await userModel.findByIdAndUpdate(id, { $set: { admin: true } });

  return res.status(200).json({ message: "Admin change Success" });
};

module.exports = {
  login,
  register,
  changeAdmin,
};
