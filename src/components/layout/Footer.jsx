import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
               🧸 kid<span>roo</span>
            </Link>
            <p>
              Kidroo is your ultimate destination for safe, fun, and educational toys. 
              We believe in the power of play to inspire creativity and joy in every child.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/about">About Us</Link>
            <Link to="/shop">Shop Now</Link>
            <Link to="/deals">Special Deals</Link>
            <Link to="/contact">Contact Support</Link>
          </div>
          
          <div className="footer-col">
            <h4>Customer Care</h4>
            <Link to="/account">My Account</Link>
            <Link to="/orders">Track Order</Link>
            <Link to="/returns">Returns Policy</Link>
            <Link to="/faq">FAQs</Link>
          </div>
          
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Kidroo. All rights reserved.</p>
          <div className="support-badge" title="Enjoy 1 year of free bug fixes and technical support">
            <span>🛡️</span> 1 Year Free Technical Support
          </div>
          <div className="payment-methods">
            💳 🏦 💵
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
