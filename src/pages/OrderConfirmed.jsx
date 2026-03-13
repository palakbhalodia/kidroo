import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './OrderConfirmed.css';

const OrderConfirmed = () => {
  const location = useLocation();
  const orderData = location.state;

  // Protect route if accessed without placing an order
  if (!orderData) {
    return <Navigate to="/" />;
  } 

  return (
    <div className="order-confirmed-page container">
      <div className="oc-card">
        <CheckCircle className="oc-icon" size={80} />
        <h1>Thank You for Your Order!</h1>
        <p className="oc-message">
          Your order <strong>{orderData.orderNumber}</strong> has been successfully placed.<br/>
          We've sent a confirmation email to <strong>{orderData.email}</strong>.
        </p> 

        <div className="oc-next-steps">
          <h3>What happens next?</h3>
          <ul className="oc-steps-list">
            <li>📦 We're curating your toys and preparing them for shipment.</li>
            <li>🚀 You will receive a tracking link once your package is on the way.</li>
            <li>🎁 Get ready for smiles and playtime!</li>
          </ul>
        </div>

        <div className="oc-actions">
          <Link to="/account" className="btn-primary">Track Your Order</Link>
          <Link to="/shop" className="btn-secondary" style={{color: 'var(--blue)', borderColor: 'var(--blue)'}}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
