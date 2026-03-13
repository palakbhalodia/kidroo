import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/orderSlice';
import { useToast } from '../components/common/Toast';
import './Checkout.css';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardName: '', cardNumber: '', expDate: '', cvv: '',
    upiId: ''
  }); 

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const shipping = totalAmount > 499 ? 0 : 50;
  const tax = Math.floor(totalAmount * 0.18);
  const finalTotal = totalAmount - discount + shipping + tax;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'KIDSFUN20') {
      setDiscount(Math.floor(totalAmount * 0.20));
      showToast('Coupon applied successfully! 20% Off', 'success');
    } else {
      setDiscount(0);
      showToast('Invalid or expired coupon code', 'error');
    }
  };

  // Prevent accessing checkout if cart is empty or not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else if (items.length === 0 && !isProcessing) {
      navigate('/cart');
    }
  }, [items.length, isProcessing, navigate, isAuthenticated]);

  if (!isAuthenticated || (items.length === 0 && !isProcessing)) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      const orderId = 'KIDROO-' + Math.floor(Math.random() * 1000000);
      
      const newOrder = {
        userEmail: user.email,
        orderId,
        items,
        total: finalTotal,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: 'Arriving Soon'
      };
      
      dispatch(addOrder(newOrder));
      dispatch(clearCart());
      
      navigate('/order-confirmed', { 
        state: { 
          orderNumber: orderId,
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

          <div className="form-section payment-section">
            <div className="section-title-small">
               <span className="step-num">2</span> Payment Information
            </div>
            
            <div className="payment-accordion">
              {/* Card Payment Option */}
              <div className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}>
                <label className="payment-header">
                  <div className="radio-control">
                    <input 
                      type="radio" 
                      name="paymentType" 
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div className="radio-custom"></div>
                  </div>
                  <div className="payment-title">
                    <span className="method-name">Credit or Debit Card</span>
                    <div className="card-icons">
                      <span className="card-icon visa">V</span>
                      <span className="card-icon mc">MC</span>
                      <span className="card-icon amex">A</span>
                    </div>
                  </div>
                </label>
                
                {paymentMethod === 'card' && (
                  <div className="payment-body">
                    <div className="credit-card-form">
                      <div className="input-group">
                        <label>Name on card</label>
                        <input type="text" name="cardName" onChange={handleChange} required />
                      </div>
                      <div className="input-group">
                        <label>Card number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" name="cardNumber" maxLength="19" onChange={handleChange} required />
                      </div>
                      <div className="input-row">
                        <div className="input-group">
                          <label>Expiry date</label>
                          <input type="text" placeholder="MM/YY" name="expDate" maxLength="5" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                          <label>Security code (CVV)</label>
                          <input type="password" placeholder="123" name="cvv" maxLength="4" onChange={handleChange} required />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* UPI Payment Option */}
              <div className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`}>
                <label className="payment-header">
                  <div className="radio-control">
                    <input 
                      type="radio" 
                      name="paymentType" 
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <div className="radio-custom"></div>
                  </div>
                  <div className="payment-title">
                    <span className="method-name">UPI APPs (GPay, PhonePe, Paytm)</span>
                  </div>
                </label>
                
                {paymentMethod === 'upi' && (
                  <div className="payment-body upi-body">
                    <div className="upi-scannerbox">
                      <div className="qr-placeholder">
                        <div className="qr-inner-pattern"></div>
                        <span>Scan to Pay</span>
                      </div>
                      <div className="upi-divider">
                        <span>OR</span>
                      </div>
                      <div className="input-group upi-input">
                        <label>Enter UPI ID</label>
                        <div className="upi-input-flex">
                          <input type="text" placeholder="yourname@bank" name="upiId" onChange={handleChange} required />
                          <button type="button" className="btn-secondary verify-btn">Verify</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cash On Delivery Option */}
              <div className={`payment-method ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <label className="payment-header">
                  <div className="radio-control">
                    <input 
                      type="radio" 
                      name="paymentType" 
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div className="radio-custom"></div>
                  </div>
                  <div className="payment-title">
                    <span className="method-name">Cash on Delivery / Pay on Delivery</span>
                  </div>
                </label>
                
                {paymentMethod === 'cod' && (
                  <div className="payment-body cod-body">
                    <div className="cod-alert">
                      <p>You can pay with Cash, UPI, or Card at the time of delivery.</p>
                      <small>Please ensure you have the exact amount if paying by cash.</small>
                    </div>
                  </div>
                )}
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
            {discount > 0 && <div className="ct-row discount-row"><span>Discount:</span> <span>-₹{discount}</span></div>}
            <div className="ct-row grand-total"><span>Total:</span> <span>₹{finalTotal}</span></div>
          </div>

          <div className="coupon-section">
            <div className="coupon-input-group">
              <input 
                type="text" 
                placeholder="Enter discount code" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)} 
              />
              <button type="button" onClick={handleApplyCoupon} className="btn-secondary">Apply</button>
            </div>
            <small style={{color: '#888', fontStyle: 'italic'}}>Try code: <strong>KIDSFUN20</strong></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
