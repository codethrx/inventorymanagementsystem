const Product = require("../models/productModel");

const mongoose = require("mongoose");

// get all
const getProducts = async (req, res) => {
  const products = await Product.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json(products);
};
const getProductsForSalesperson = async (req, res) => {
  const products = await Product.find({ userId: req.params.adminId }).sort({
    createdAt: -1,
  });

  res.status(200).json(products);
};
// get single
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// create
const createProduct = async (req, res) => {
  // console.log(req.file);
  // res.status(200).json({ ...req.body });
  const { name, price, category } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!price) {
    emptyFields.push("price");
  }
  // if (!imageUrl) {
  //   emptyFields.push("image url");
  // }
  if (!category) {
    emptyFields.push("category");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    if (await Product.findOne({ userId: req.user._id, name }))
      return res
        .status(400)
        .json({ error: "Product is already added in the list for this user." });
    const product = await Product.create({
      name,
      price,
      // imageUrl,
      category,
      userId: req.user._id,
      quantity: req.body.quantity,
      description: req.body.description,
      imageUrl: req.file?.path,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const product = await Product.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// update
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const payload = {};
  console.log(req?.file);
  if (req.file?.path) {
    payload["imageUrl"] = req.file?.path;
  }
  console.log("P", payload);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such producta" });
  }
  // console.log(req.body.name);
  const exists = await Product.findOne({
    userId: req.user._id,
    name: req.body.name,
    _id: { $ne: id },
  });
  // console.log(exists);
  if (exists)
    return res
      .status(400)
      .json({ error: "Prduct already exisit for this vendor" });
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      {
        ...req.body,
        ...payload,
      }
    );

    // if (!product) {
    //   return res.status(400).json({ error: "No such product" });
    // }

    // res.status(200).json(product);
    res.status(200).json({ product });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsForSalesperson,
};
