const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  subtitle: String,
  description: String,   // ✅ Add this field
  rating: Number,
  price: Number,
  discount: Number,
  type: String,
  variants: [
    {
      name: String,
      price: Number,
      discount: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);

