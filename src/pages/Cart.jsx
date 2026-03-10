import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-empty container">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Looks like you haven't added any toys to your cart yet.</p>
        <Link to="/shop" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="cart-title">Your Toy Box <span>({totalQuantity} items)</span></h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-product">
                <div className="cart-item-img" style={{ background: item.bgTheme }}>
                  {item.icon}
                </div>
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>
              </div>
              
              <div className="cart-item-quantity">
                <button onClick={() => dispatch(removeFromCart(item.id))}><Minus size={16} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))}><Plus size={16} /></button>
              </div>
              
              <div className="cart-item-total">
                ₹{item.totalPrice}
              </div>
            </div>
          ))}

          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
              <Trash2 size={18} /> Clear Cart
            </button>
            <Link to="/shop" className="continue-shopping">← Continue Shopping</Link>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{totalAmount > 499 ? 'Free' : '₹50'}</span>
          </div>
          
          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>₹{Math.floor(totalAmount * 0.18)}</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalAmount + (totalAmount > 499 ? 0 : 50) + Math.floor(totalAmount * 0.18)}</span>
          </div>
          
          <button className="btn-primary checkout-btn" onClick={() => {
            if (isAuthenticated) {
              navigate('/checkout');
            } else {
              navigate('/login', { state: { from: { pathname: '/checkout' } } });
            }
          }}>
            Proceed to Checkout <ArrowRight size={20} />
          </button>
          
          <div className="secure-checkout">
            <p>🔒 Secure Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
