import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Derive live suggestions from actual products
  const filteredSuggestions = searchVal 
    ? Array.from(new Set(
        products
          .filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                       p.category.toLowerCase().includes(searchVal.toLowerCase()))
          .map(p => p.name)
      )).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (term) => {
    setSearchVal(term);
    setShowSuggestions(false);
    navigate('/shop?q=' + encodeURIComponent(term));
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      navigate('/shop?q=' + encodeURIComponent(searchVal.trim()));
      setMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/deals', label: 'Deals' },
    { to: '/about', label: 'About' },
  ]; 

  return (
    <header className="main-header">
      <div className="announce">
        <div className="announce-text">
          🎉 Free Shipping on orders above ₹499 &nbsp;|&nbsp;
          <strong>KIDSFUN20</strong> – 20% OFF your first order!
        </div>
        <div className="announce-links">
          <Link to="/admin" className="admin-link-header">⚙️ Admin Panel</Link>
        </div>
      </div>

      <div className="header-container">
        <Link to="/" className="logo">
          🧸 kid<span>roo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
          
          <div 
            className="nav-item has-mega-menu"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Shop</NavLink>
            
            {showMegaMenu && (
              <div className="mega-menu">
                <div className="mega-col">
                  <h4>By Age</h4>
                  <Link to="/shop?age=0-2" onClick={() => setShowMegaMenu(false)}>0 - 2 Years</Link>
                  <Link to="/shop?age=3-5" onClick={() => setShowMegaMenu(false)}>3 - 5 Years</Link>
                  <Link to="/shop?age=6-9" onClick={() => setShowMegaMenu(false)}>6 - 9 Years</Link>
                  <Link to="/shop?age=10" onClick={() => setShowMegaMenu(false)}>10+ Years</Link>
                </div>
                <div className="mega-col">
                  <h4>By Category</h4>
                  <Link to="/shop?category=Vehicles" onClick={() => setShowMegaMenu(false)}>Vehicles</Link>
                  <Link to="/shop?category=Puzzles" onClick={() => setShowMegaMenu(false)}>Puzzles</Link>
                  <Link to="/shop?category=Dolls" onClick={() => setShowMegaMenu(false)}>Dolls</Link>
                  <Link to="/shop?category=STEM Kits" onClick={() => setShowMegaMenu(false)}>STEM Kits</Link>
                </div>
                <div className="mega-img">
                  <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Toys" />
                  <div className="mega-img-text">New Arrivals!</div>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/deals" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Deals</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>About</NavLink>
        </nav>


        <div className="header-actions">
          {/* Search */}
          <div className="search-wrapper" ref={searchRef}>
            <Search className="search-icon" size={18} />
            <input
              className="search-bar"
              type="text"
              placeholder="Search toys..."
              value={searchVal}
              onChange={(e) => {
                const val = e.target.value;
                setSearchVal(val);
                if (val.trim() === '') {
                  // Live clearing feature: navigate instantly back to all products
                  navigate('/shop');
                  setShowSuggestions(false);
                } else {
                  setShowSuggestions(true);
                }
              }}
              onFocus={() => { if(searchVal.trim() !== '') setShowSuggestions(true); }}
              onKeyDown={handleSearch}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="search-suggestions">
                {filteredSuggestions.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    <Search size={14} className="suggestion-icon" /> {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Link */}
          <Link to="/account" className="icon-btn" title="My Account">
            <User size={22} />
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="icon-btn header-wishlist" title="Wishlist">
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="wishlist-badge">{wishlistItems.length}</span>
            )}
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
          <Link to="/wishlist" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
          </Link>
          <Link to="/cart" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            Cart {totalQuantity > 0 && `(${totalQuantity})`}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
