const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Product", productSchema);
