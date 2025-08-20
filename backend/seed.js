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
    rating: 2.5,
    price: 35,
    discount: 79,
    type: "daily"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 2",
    subtitle: "Subtitle 2",
    rating: 4.0,
    price: 120,
    discount: 10,
    type: "electronics"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 3",
    subtitle: "Subtitle 3",
    rating: 3.8,
    price: 75,
    discount: 20,
    type: "books"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 4",
    subtitle: "Subtitle 4",
    rating: 4.5,
    price: 200,
    discount: 0,
    type: "home"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 5",
    subtitle: "Subtitle 5",
    rating: 4.2,
    price: 50,
    discount: 5,
    type: "clothing"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 6",
    subtitle: "Subtitle 6",
    rating: 3.0,
    price: 300,
    discount: 15,
    type: "electronics"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 7",
    subtitle: "Subtitle 7",
    rating: 4.9,
    price: 150,
    discount: 25,
    type: "toys"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 8",
    subtitle: "Subtitle 8",
    rating: 3.5,
    price: 90,
    discount: 10,
    type: "food"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 9",
    subtitle: "Subtitle 9",
    rating: 4.1,
    price: 60,
    discount: 0,
    type: "sports"
  },
  {
    imageUrl: "https://res.cloudinary.com/dqxsjxmu6/image/upload/v1737461674/dwwdyinwl39pqe2wwgnm.webp",
    title: "Product 10",
    subtitle: "Subtitle 10",
    rating: 4.7,
    price: 250,
    discount: 30,
    type: "automotive"
  },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
