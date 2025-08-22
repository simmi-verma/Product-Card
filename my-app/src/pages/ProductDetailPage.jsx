import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../style/ProductDetails.css";                 // ← make sure this import path is correct
import ProductCard from "../components/ProductCard"; // Added import for ProductCard

function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state || null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null); // New state for selected variant

  useEffect(() => {
    if (!product) {
      (async () => {
        try {
          const res = await fetch(`http://localhost:5000/products/${id}`);
          const data = await res.json();
          setProduct(data);
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]); // Set first variant as default
          }
        } catch (e) {
          console.error("Error fetching product:", e);
        }
      })();
    }
  }, [id, product]);

  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          const res = await fetch(`http://localhost:5000/products/${product._id}/related`);
          if (!res.ok) throw new Error(`Failed to fetch related products: ${res.status}`);
          const data = await res.json();
          setRelatedProducts(data);
        } catch (error) {
          console.error("Error fetching related products:", error);
        }
      };
      fetchRelatedProducts();
    }
  }, [product]);

  // Update selected variant when product changes (e.g., if navigating from related products)
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return <p style={{ textAlign: "center", marginTop: 40, fontSize: 18, color: "#4a5568" }}>Loading product details...</p>;

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayDiscount = selectedVariant ? selectedVariant.discount : product.discount;

  return (
    <div className="pdp">
      <Link to="/" className="pdp__back">
        <span style={{ fontSize: "20px" }}>←</span> Back to Products
      </Link>

      <div className="pdp__card">
        <div className="pdp__image-wrap">
          <img className="pdp__image" src={product.imageUrl} alt={product.title} />
        </div>

        <div>
          <h1 className="pdp__title">{product.title}</h1>
          {product.subtitle && <p className="pdp__subtitle">{product.subtitle}</p>}
          {product.description && <p className="pdp__desc">{product.description}</p>}

          {product.variants && product.variants.length > 0 && (
            <div className="pdp__variants">
              <h4 style={{ marginBottom: "10px", color: "#2d3748" }}>Select Variant:</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(variant)}
                    style={{
                      padding: "8px 15px",
                      border: `1px solid ${selectedVariant && selectedVariant.name === variant.name ? "#3182ce" : "#cbd5e0"}`,
                      borderRadius: "5px",
                      backgroundColor: selectedVariant && selectedVariant.name === variant.name ? "#ebf8ff" : "#fff",
                      color: selectedVariant && selectedVariant.name === variant.name ? "#3182ce" : "#4a5568",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp__meta">
            <span className="pdp__price">₹{displayPrice}</span>
            {typeof product.rating === "number" && (
              <span className="pdp__rating">⭐ {product.rating.toFixed(1)}</span>
            )}
            {displayDiscount > 0 && (
              <span className="pdp__discount">{displayDiscount}% OFF</span>
            )}
          </div>

          <button className="pdp__cta">Add to Cart</button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => setProduct(null)} // Clear product to refetch on navigation
              >
                <ProductCard product={p} wishlist={[]} toggleWishlist={() => {}} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
