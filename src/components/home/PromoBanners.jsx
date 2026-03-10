import React from 'react';
import { Link } from 'react-router-dom';
import './PromoBanners.css';

const PromoBanners = () => {
  return (
    <div className="container">
      <div className="banner-row">
        <div className="promo-banner banner-blue">
          <span className="emoji-main">🚀</span>
          <h3>Space Explorer Bundle</h3>
          <p>Rockets, planets & stars — all in one kit!</p>
          <Link to="/shop?category=bundle1" className="btn-white">Shop Bundle →</Link>
        </div>
        <div className="promo-banner banner-orange">
          <span className="emoji-main">🎨</span>
          <h3>Art & Craft Sale</h3>
          <p>Up to 40% off all creative kits this week!</p>
          <Link to="/deals" className="btn-white">Grab the Deal →</Link>
        </div>
      </div>
    </div>
  );
};

export default PromoBanners;
