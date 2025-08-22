import React from 'react';

const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const { _id, imageUrl, title, subtitle, rating, price, discount } = product;

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
          {discount > 0 ? (
            <span className="discount">{discount}% off</span>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
