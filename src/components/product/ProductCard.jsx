import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating if clicked inside a Link
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-img-link">
        <div className="product-img" style={{ background: product.bgTheme }}>
          {product.icon}
          {product.isHot && <span className="badge hot">🔥 Hot</span>}
          {product.isNew && <span className="badge new">✨ New</span>}
          {product.isTop && <span className="badge top">⭐ Top Pick</span>}
          <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>🤍</button>
        </div>
      </Link>
      
      <div className="product-info">
        <div className="product-age">Age {product.age}</div>
        <Link to={`/product/${product.id}`} className="product-name-link">
          <div className="product-name">{product.name}</div>
        </Link>
        
        <div className="stars">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span>({product.reviews})</span>
        </div>
        
        <div className="price-row">
          <div>
            <span className="price">₹{product.price}</span>
            {product.oldPrice && <span className="price-old">₹{product.oldPrice}</span>}
          </div>
          <button className="add-btn" onClick={handleAddToCart}>+ Add</button>
        </div>
      </div>
    </div>
  );
};

// Use React.memo for performance optimization
export default React.memo(ProductCard);
