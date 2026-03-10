import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      navigate('/shop');
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/shop', label: 'Deals' },
    { to: '/shop', label: 'About' },
  ];

  return (
    <header className="main-header">
      <div className="announce">
        🎉 Free Shipping on orders above ₹499 &nbsp;|&nbsp;
        <strong>KIDSFUN20</strong> – 20% OFF your first order!
        &nbsp;|&nbsp; Same-day delivery available 🚚
      </div>

      <div className="header-container">
        <Link to="/" className="logo">
          🧸 kid<span>roo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) => (isActive && label === 'Home' ? 'nav-link active' : 'nav-link')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {/* Search */}
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              className="search-bar"
              type="text"
              placeholder="Search toys..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* Account Link */}
          <Link to="/account" className="icon-btn" title="My Account">
            <User size={22} />
          </Link>

          {/* Cart */}
          <button className="cart-btn" onClick={() => navigate('/cart')}>
            <ShoppingCart size={20} />
            <span className="cart-text">Cart</span>
            {totalQuantity > 0 && (
              <span className="cart-count">{totalQuantity}</span>
            )}
          </button>

          {/* Hamburger for mobile */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <nav className="mobile-nav">
          {navLinks.map(({ to, label }) => (
            <Link key={label} to={to} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link to="/account" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>My Account</Link>
          <Link to="/cart" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            Cart {totalQuantity > 0 && `(${totalQuantity})`}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
