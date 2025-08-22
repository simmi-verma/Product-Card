const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const products = [
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Arihant ECG Gel, 250 ml",
    subtitle: "Brand: Arihant",
    description: "High-quality ECG gel designed for medical professionals. Ensures accurate readings and patient comfort.",
    rating: 2.5,
    price: 35,
    discount: 79,
    type: "daily",
    variants: [
      { name: "250 ml", price: 35, discount: 79 },
      { name: "500 ml", price: 60, discount: 70 },
      { name: "1000 ml", price: 100, discount: 60 },
    ],
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 2",
    subtitle: "Subtitle 2",
    description: "A versatile electronic product perfect for daily use with modern features.",
    rating: 4.0,
    price: 120,
    discount: 10,
    type: "electronics",
    variants: [
      { name: "Standard", price: 120, discount: 10 },
      { name: "Deluxe", price: 150, discount: 15 },
    ],
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 3",
    subtitle: "Subtitle 3",
    description: "An engaging book with valuable insights and easy-to-read chapters.",
    rating: 3.8,
    price: 75,
    discount: 20,
    type: "books",
    variants: [
      { name: "Paperback", price: 75, discount: 20 },
      { name: "Hardcover", price: 100, discount: 10 },
    ],
  },
  // ...repeat for other products
];


const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
