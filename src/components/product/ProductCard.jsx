import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlistItem } from '../../store/slices/wishlistSlice';
import { useToast } from '../common/Toast';
import { Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating if clicked inside a Link
    dispatch(addToCart(product));
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlistItem(product));
    if (isInWishlist) {
      showToast(`Removed ${product.name} from wishlist.`, 'info');
    } else {
      showToast(`Added ${product.name} to wishlist!`, 'success');
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-img-link">
        <div className="product-img" style={{ background: product.bgTheme }}>
          {product.icon}
          {product.isHot && <span className="badge hot">🔥 Hot</span>}
          {product.isNew && <span className="badge new">✨ New</span>}
          {product.isTop && <span className="badge top">⭐ Top Pick</span>}
          <button 
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`} 
            onClick={handleToggleWishlist}
            style={{ color: isInWishlist ? 'var(--danger-color, #e74c3c)' : '#999' }}
          >
            <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
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
