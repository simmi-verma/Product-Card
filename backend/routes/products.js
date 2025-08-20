const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /products?minPrice=&maxPrice=&rating=&type=&sortBy=
router.get("/", async (req, res) => {
  try {
    const { minPrice, maxPrice, rating, type, sortBy } = req.query;
    let query = {};

    if (type) query.type = { $in: type.split(",") };
    if (rating) query.rating = { $gte: Number(rating) };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let products = await Product.find(query);

    if (sortBy) {
      if (sortBy === "lowToHigh") products.sort((a, b) => a.price - b.price);
      else if (sortBy === "highToLow") products.sort((a, b) => b.price - a.price);
      else if (sortBy === "rating") products.sort((a, b) => b.rating - a.rating);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /products (for adding a product)
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
