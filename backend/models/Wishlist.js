const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
