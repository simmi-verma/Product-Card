// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Filters from "./components/Filters";
// import ProductGrid from "./components/ProductGrid";
// import SortBar from "./components/SortBar";

// function App() {
//   const [filters, setFilters] = useState({
//     type: [],
//     price: { min: 0, max: 6000 },
//     rating: 0
//   });

//   const [sortBy, setSortBy] = useState("popularity");
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   const totalProducts = 8096;

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const query = `?minPrice=${filters.price.min}&maxPrice=${filters.price.max}&rating=${filters.rating}&type=${filters.type.join(",")}&sortBy=${sortBy}`;
//         console.log("Fetching products with query:", query);

//         const res = await fetch(`http://localhost:5000/products${query}`);
//         if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
//         const data = await res.json();
//         console.log("Fetched products:", data);
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [filters, sortBy]);

//   // Fetch wishlist from backend
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/wishlist");
//         if (!res.ok) throw new Error(`Failed to fetch wishlist: ${res.status}`);
//         const data = await res.json();
//         console.log("Fetched wishlist:", data);
//         setWishlist(data);
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   // Toggle wishlist item
//   const toggleWishlist = async (productId) => {
//     try {
//       const exists = wishlist.find(item => item.productId._id === productId);

//       if (exists) {
//         await fetch(`http://localhost:5000/wishlist/${exists._id}`, { method: "DELETE" });
//       } else {
//         await fetch("http://localhost:5000/wishlist", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId })
//         });
//       }

//       // Refresh wishlist
//       const res = await fetch("http://localhost:5000/wishlist");
//       if (!res.ok) throw new Error("Failed to refresh wishlist");
//       const data = await res.json();
//       setWishlist(data);
//     } catch (error) {
//       console.error("Error toggling wishlist:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <Filters filters={filters} setFilters={setFilters} />
//       <main className="product-listing">
//         <SortBar
//           productCount={products.length}
//           totalProducts={totalProducts}
//           sortBy={sortBy}
//           setSortBy={setSortBy}
//         />
//         <ProductGrid
//           products={products}
//           wishlist={wishlist}
//           toggleWishlist={toggleWishlist}
//         />
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
