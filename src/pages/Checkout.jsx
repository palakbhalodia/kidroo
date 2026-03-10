import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardName: '', cardNumber: '', expDate: '', cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = totalAmount > 499 ? 0 : 50;
  const tax = Math.floor(totalAmount * 0.18);
  const finalTotal = totalAmount + shipping + tax;

  // Prevent accessing checkout if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing delay
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/order-confirmed', { 
        state: { 
          orderNumber: 'KIDROO-' + Math.floor(Math.random() * 1000000),
          email: formData.email
        }
      });
    }, 2000);
  };

  return (
    <div className="checkout-page container">
      <h1 className="checkout-title">Secure Checkout</h1>
      
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <div className="form-section">
            <div className="section-title-small">
              <span className="step-num">1</span> Shipping Details
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input required type="text" name="firstName" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input required type="text" name="lastName" onChange={handleChange} />
              </div>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>Email Address</label>
                <input required type="email" name="email" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input required type="tel" name="phone" onChange={handleChange} />
              </div>
            </div>
            
            <div className="input-group">
              <label>Street Address</label>
              <input required type="text" name="address" onChange={handleChange} />
            </div>
            
            <div className="input-row three-cols">
              <div className="input-group">
                <label>City</label>
                <input required type="text" name="city" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>State</label>
                <input required type="text" name="state" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>ZIP Code</label>
                <input required type="text" name="zip" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title-small">
              <span className="step-num">2</span> Payment Information
            </div>
            
            <div className="payment-methods-radio">
              <label className="payment-option active">
                <input type="radio" name="paymentType" defaultChecked />
                <span>💳 Credit / Debit Card</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="paymentType" />
                <span>💵 Cash on Delivery</span>
              </label>
            </div>
            
            <div className="credit-card-details">
              <div className="input-group">
                <label>Name on Card</label>
                <input required type="text" name="cardName" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Card Number</label>
                <input required type="text" placeholder="XXXX XXXX XXXX XXXX" name="cardNumber" onChange={handleChange} />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input required type="text" placeholder="MM/YY" name="expDate" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input required type="text" placeholder="XXX" name="cvv" onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary place-order-btn" disabled={isProcessing}>
            {isProcessing ? 'Processing Order...' : `Place Order (₹${finalTotal})`}
          </button>
        </form>

        <div className="checkout-summary-sidebar">
          <h3>Order Details</h3>
          <div className="checkout-items">
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="ci-img" style={{background: item.bgTheme}}>{item.icon}</div>
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-qty">Qty: {item.quantity}</div>
                </div>
                <div className="ci-price">₹{item.totalPrice}</div>
              </div>
            ))}
          </div>
          
          <div className="checkout-totals">
            <div className="ct-row"><span>Subtotal:</span> <span>₹{totalAmount}</span></div>
            <div className="ct-row"><span>Shipping:</span> <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
            <div className="ct-row"><span>Estimated Tax:</span> <span>₹{tax}</span></div>
            <div className="ct-row grand-total"><span>Total:</span> <span>₹{finalTotal}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
