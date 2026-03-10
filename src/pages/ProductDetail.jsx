import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { fetchMockProductById } from '../services/mockApi';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;
    
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMockProductById(id);
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load product details');
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Create a specific payload that includes the quantity
      const cartItem = {
        ...product,
        quantity: quantity,
        totalPrice: product.price * quantity
      };
      
      // Since our cartSlice add action currently simply increments by 1,
      // For a proper implementation here we'd dispatch multiple times or modify the slice.
      // Modifying the slice is better, but this works with the current Redux logic
      // if we repeatedly call addToCart to match the user's selected quantity.
      for(let i = 0; i < quantity; i++) {
         dispatch(addToCart(product));
      }
      
      // Optional: Add a small toast notification here or navigate
      alert(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="product-page-container"><Loader /></div>;
  if (error) return <div className="product-page-container"><ErrorMessage message={error} onRetry={() => window.location.reload()} /></div>;
  if (!product) return null;

  return (
    <div className="product-page-container container">
      <button className="back-btn" onClick={handleBack}>← Back to Shop</button>
      
      <div className="product-detail-layout">
        <div className="product-detail-image" style={{ background: product.bgTheme }}>
          <div className="main-icon">{product.icon}</div>
          <div className="product-badges">
            {product.isHot && <span className="badge hot">🔥 Hot</span>}
            {product.isNew && <span className="badge new">✨ New</span>}
            {product.isTop && <span className="badge top">⭐ Top Pick</span>}
          </div>
        </div>

        <div className="product-detail-info">
          <div className="product-age-tag">Ages {product.age}</div>
          <h1 className="product-detail-title">{product.name}</h1>
          
          <div className="product-rating">
            <span className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="reviews-count">({product.reviews} customer reviews)</span>
          </div>

          <div className="product-detail-price">
            <span className="current-price">₹{product.price}</span>
            {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
            {product.oldPrice && <span className="discount-tag">Save ₹{product.oldPrice - product.price}</span>}
          </div>

          <p className="product-description">
            Bring home the magic with the {product.name}! This premium toy is designed to provide hours of engaging fun and developmental benefits. Made from child-safe, non-toxic materials, it's the perfect gift for any occasion.
          </p>

          <div className="product-features">
            <ul>
              <li>✅ 100% Safe & Certified</li>
              <li>✅ Enhances cognitive skills</li>
              <li>✅ Durable & long-lasting build</li>
            </ul>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >-</button>
              <span className="qty-value">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="qty-btn"
              >+</button>
            </div>
            
            <button className="btn-primary add-to-cart-large" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          </div>
          
          <div className="delivery-info">
            <p>🚚 <strong>Free Delivery</strong> on orders over ₹499</p>
            <p>🛡️ <strong>30-Day Returns</strong> easy and hassle-free</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
