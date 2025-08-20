import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, wishlist, toggleWishlist }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}           // use _id from backend
          product={product}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
