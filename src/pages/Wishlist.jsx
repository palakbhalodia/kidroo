import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { removeWishlistItem, clearWishlist } from '../store/slices/wishlistSlice';
import { ShoppingCart, HeartOff, Trash2 } from 'lucide-react';
import './Wishlist.css';

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(removeWishlistItem(product.id)); // Optional: Remove from wishlist after adding to cart
  };

  if (items.length === 0) {
    return (
      <div className="empty-wishlist container">
        <HeartOff size={80} className="empty-icon" />
        <h2>Your Wishlist is Empty</h2>
        <p>Save items you love and buy them later.</p>
        <button className="btn-primary" onClick={() => navigate('/shop')}>
          Explore Toys
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-page container">
      <div className="wishlist-header">
        <h1>My Wishlist <span>({items.length} Items)</span></h1>
        <button className="btn-secondary clear-btn" onClick={() => dispatch(clearWishlist())}>
          <Trash2 size={18} /> Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {items.map((product) => (
          <div key={product.id} className="wishlist-card">
            <button 
              className="remove-btn"
              onClick={() => dispatch(removeWishlistItem(product.id))}
              title="Remove from Wishlist"
            >
              <HeartOff size={18} />
            </button>
            <div 
              className="wc-img" 
              style={{ background: product.bgTheme }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <span className="wc-icon">{product.icon}</span>
            </div>
            <div className="wc-details">
              <h3 className="wc-name">{product.name}</h3>
              <div className="wc-price">₹{product.price}</div>
              <button 
                className="btn-primary wc-add-btn"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart size={18} /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
