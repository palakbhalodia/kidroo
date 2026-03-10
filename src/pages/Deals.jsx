import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlistItem } from '../store/slices/wishlistSlice';
import { ShoppingCart, Heart, Tag } from 'lucide-react';
import './Deals.css';

const Deals = () => {
  const { items: products } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter products that belong to the 'Deals' category or have a simulated discount
  // For simplicity, we just take the first 4 products as "Deals of the Day"
  const dealProducts = products.slice(0, 4);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleToggleWishlist = (e, product) => {
    e.stopPropagation();
    dispatch(toggleWishlistItem(product));
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <div className="deals-page container">
      <div className="deals-header">
        <h1><Tag className="title-icon" /> Super Saver Deals</h1>
        <p>Grab the best toys at unbeatable prices before they're gone!</p>
      </div>

      <div className="deals-grid">
        {dealProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card deal-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="deal-badge">20% OFF</div>
            <button 
              className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={(e) => handleToggleWishlist(e, product)}
              title="Add to Wishlist"
            >
              <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            </button>
            <div className="pc-img" style={{ background: product.bgTheme }}>
              <span className="pc-icon">{product.icon}</span>
            </div>
            <div className="pc-details">
              <span className="pc-category">{product.category}</span>
              <h3 className="pc-name">{product.name}</h3>
              <div className="pc-rating">{'⭐'.repeat(Math.floor(product.rating))} <span>({product.reviews})</span></div>
              <div className="pc-price-wrap">
                <span className="pc-price">₹{product.price}</span>
                <span className="pc-original-price">₹{Math.floor(product.price * 1.25)}</span>
              </div>
              <button 
                className="btn-primary add-to-cart-btn"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
