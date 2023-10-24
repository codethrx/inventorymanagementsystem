const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const Affiliation = require("../models/affiliations");
const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if (user.type != "Super Admin" && !user.approved) {
      return res.status(400).json({ error: "User is not activated yet." });
    }
    const token = createToken({ _id: user._id, type: user.type });

    res
      .status(200)
      .json({
        token,
        id: user._id,
        email: user.email,
        type: user.type,
        adminId: user.adminId,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, fullName, type, phone, adminId } = req.body;
  // console.log(req.body);
  try {
    // if (type === "Admin") {
    if (await User.findOne({ email }))
      return res.status(400).json({ error: "User already in the list." });
    // }
    const user = await User.signup(
      email,
      password,
      fullName,
      type,
      phone,
      adminId
    );
    // if (user.type === "Sales Person") {
    //   const affiliation = await Affiliation.create({
    //     adminId,
    //     salesPersonId: user?._id,
    //   });
    // }

    // create a token
    const token = createToken({ _id: user._id, type: user.type });

    res.status(200).json({ token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
};
const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  return res.status(200).json(user);
};
const truncateUsers = async (req, res) => {
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  return res.status(200).json({ success: true });
};

const deleteStore = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such store" });
  }

  const store = await User.findOneAndDelete({
    _id: id,
  });
  if (!store) {
    return res.status(400).json({ error: "No such Store" });
  }
  await Product.deleteMany({ userId: id });
  await Category.deleteMany({ userId: id });

  res.status(200).json({ success: "Store deleted" + id });
};
const toggleActivityStore = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Store" });
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        approved: req.body.approved,
      }
    );
    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const updateStore = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Store" });
  }
  const payload = {};

  try {
    const storeExists = await User.findOne({
      fullName: req.body.fullName,
      _id: { $ne: id },
    });
    if (req.body.fullName) {
      payload["fullName"] = req.body.fullName;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      payload["password"] = hash;
    }
    if (req.body.phone) {
      payload["phone"] = req.body.phone;
    }
    if (storeExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...payload,
      }
    );

    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const getStores = async (req, res) => {
  const stores = await User.find({ type: "Admin" });
  res.status(200).json(stores);
};
const getSalesperson = async (req, res) => {
  const stores = await User.find({ adminId: req.params.id });
  res.status(200).json(stores);
};
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  const resetToken = await user.getResetToken();

  await user.save();

  const url = `http://localhost:3000/reset-password/${resetToken}`;

  const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;

  // Send token via email
  await sendEmail(user.email, "Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  console.log("Before", token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  console.log("after", resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return res.status(400).json({ error: "Token is not created or expired." });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  user.password = hash;
  // user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
};
module.exports = {
  signupUser,
  loginUser,
  getUsers,
  truncateUsers,
  getStores,
  deleteStore,
  updateStore,
  getUser,
  toggleActivityStore,
  forgetPassword,
  resetPassword,
  getSalesperson,
};
