import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlistItem } from '../store/slices/wishlistSlice';
import { fetchProducts } from '../store/slices/productSlice';
import { fetchMockProductById } from '../services/mockApi';
import { useToast } from '../components/common/Toast';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import ProductCard from '../components/product/ProductCard';
import { Heart, Download } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: allProducts, status: productsStatus } = useSelector((state) => state.products);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

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

    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }

    return () => {
      isMounted = false;
    };
  }, [id, productsStatus, dispatch]);

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
      
      showToast(`Added ${quantity} ${product.name} to cart!`, 'success');
    }
  };

  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  const handleToggleWishlist = () => {
    if (product) {
      dispatch(toggleWishlistItem(product));
      if (isInWishlist) {
        showToast(`Removed ${product.name} from wishlist.`, 'info');
      } else {
        showToast(`Added ${product.name} to wishlist!`, 'success');
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="product-page-container"><Loader /></div>;
  if (error) return <div className="product-page-container"><ErrorMessage message={error} onRetry={() => window.location.reload()} /></div>;
  if (!product) return null;

  const mockGallery = [
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&w=600&q=80',
    'https://images.unsplash.com/photo-1566589345758-1f19f2ba955a?ixlib=rb-4.0.3&w=600&q=80',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&w=600&q=80'
  ];

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="product-page-container container">
      <button className="back-btn" onClick={handleBack}>← Back to Shop</button>
      
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="main-image">
            {activeImage === 0 ? (
              <div className="product-detail-hero" style={{ background: product.bgTheme }}>
                <div className="main-icon">{product.icon}</div>
              </div>
            ) : (
              <img src={mockGallery[activeImage - 1]} alt={product.name} />
            )}
            <div className="product-badges">
              {product.isHot && <span className="badge hot">🔥 Hot</span>}
              {product.isNew && <span className="badge new">✨ New</span>}
              {product.isTop && <span className="badge top">⭐ Top Pick</span>}
            </div>
          </div>
          <div className="thumbnail-list">
            <div 
              className={`thumbnail ${activeImage === 0 ? 'active' : ''}`} 
              onClick={() => setActiveImage(0)} 
              style={{ background: product.bgTheme }}
            >
              <span className="thumb-icon">{product.icon}</span>
            </div>
            {mockGallery.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumbnail ${activeImage === idx + 1 ? 'active' : ''}`} 
                onClick={() => setActiveImage(idx + 1)}
              >
                <img src={img} alt="Thumbnail view" />
              </div>
            ))}
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
            <button 
              className={`btn-outline wishlist-btn-large ${isInWishlist ? 'active' : ''}`} 
              onClick={handleToggleWishlist}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                marginTop: '15px',
                padding: '14px',
                borderRadius: '50px',
                borderColor: isInWishlist ? 'var(--danger-color, #e74c3c)' : '#ddd',
                color: isInWishlist ? 'var(--danger-color, #e74c3c)' : '#555',
                background: isInWishlist ? '#fff5f5' : 'transparent',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              {isInWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
          
          <div className="delivery-info">
            <p>🚚 <strong>Free Delivery</strong> on orders over ₹499</p>
            <p>🛡️ <strong>30-Day Returns</strong> easy and hassle-free</p>
          </div>

          <div className="brochure-section">
            <button 
              className="btn-outline brochure-btn" 
              onClick={() => alert(`Downloading brochure for ${product.name}...`)}
            >
              <Download size={20} /> Download Product Brochure
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="section-title">
            <span className="dot" style={{ background: 'var(--blue)' }}></span>
            You Might Also Like
          </div>
          <p className="section-sub">Similar toys in {product.category}</p>
          <div className="products-grid">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
