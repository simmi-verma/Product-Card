import React from 'react';

const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const { _id, imageUrl, title, subtitle, rating, price, discount } = product;

  // Check if this product is in the wishlist
  const isWishlisted = wishlist.some(item => item.productId._id === _id);

  return (
    <div className="product-card">
      <div className="card-image-container">
        <img src={imageUrl} alt={title} className="product-image" />
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(_id)}
        >
          ♡
        </button>
      </div>
      <div className="card-details">
        <p className="product-title">{title}</p>
        <p className="product-subtitle">{subtitle}</p>
        <div className="rating">
          <span className="rating-box">{rating} ★</span>
        </div>
        <div className="price">
          <span>₹{price}</span>
          {discount ? (
            <span className="discount">{discount}% off</span>
          ) : (
            <span className="discount">No discount</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
