const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  subtitle: String,
  rating: Number,
  price: Number,
  discount: Number,
  type: String
});

module.exports = mongoose.model("Product", ProductSchema);
