const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

// get all
const getCategories = async (req, res) => {
  console.log(req.user);
  const categories = await Category.find({ userId: req.user._id });
  res.status(200).json(categories);
};

// get single
const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Category" });
  }

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({ error: "No such Category" });
  }

  res.status(200).json(category);
};

// create
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const exists = await Category.findOne({
      name,
      userId: req.user._id,
    });
    // console.log({ currentId: req.user._id, ...exists });
    if (exists) {
      return res
        .status(400)
        .json({ error: "Category already exists for this user" });
    }
    const category = await Category.create({
      name,
      description,
      userId: req.user._id,
    });
    res.status(200).json(category);
  } catch (error) {
    console.log(error.code);

    res.status(400).json({ error: error.message });
  }
};

// delete
const deleteAllCategories = async (req, res) => {
  await Category.deleteMany({});
  res.status(200).json({ success: "Deleted XD" });
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Category" });
  }

  const category = await Category.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });
  await Product.updateMany(
    { userId: req.user._id, category: category.name },
    {
      category: "",
    }
  );
  if (!category) {
    return res.status(400).json({ error: "No such Category" });
  }

  res.status(200).json(category);
};

// update
const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Category" });
  }

  try {
    const categoryExists = await Category.findOne({
      userId: req.user._id,
      name: req.body.name,
      _id: { $ne: id },
    });
    if (categoryExists) {
      return res
        .status(400)
        .json({ error: "Category already exists in the system" });
    }
    const category = await Category.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      {
        ...req.body,
      }
    );
    await Product.updateMany(
      { userId: req.user._id, category: category.name },
      {
        category: "",
      }
    );
    if (!category) {
      return res.status(400).json({ error: "No such Category" });
    }

    res.status(200).json(category);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  deleteAllCategories,
};
