import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, wishlist, toggleWishlist }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}   // Navigate to detail page
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ProductCard
            product={product}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;

