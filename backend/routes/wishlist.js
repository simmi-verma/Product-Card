const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// GET all wishlist items
router.get("/", async (req, res) => {
  try {
    const items = await Wishlist.find().populate("productId");
    // Filter out items where productId population resulted in null (product might have been deleted)
    const validItems = items.filter(item => item.productId !== null);
    res.json(validItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add to wishlist
router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;
    const exists = await Wishlist.findOne({ productId });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    const item = new Wishlist({ productId });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remove from wishlist
router.delete("/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
