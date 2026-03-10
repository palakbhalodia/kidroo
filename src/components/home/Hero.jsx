import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-badge">✨ New Arrivals Just Dropped!</div>
        <h1>
          Where Every Day<br />
          Is a <span className="highlight">Playday!</span>
        </h1>
        <p>
          Discover thousands of toys for every age — from toddlers to teens.<br />
          Safe, fun, and delivered to your door.
        </p>
        <div className="hero-btns">
          <Link to="/shop" className="btn-primary">🛍️ Shop Now</Link>
          <Link to="/deals" className="btn-secondary">🎁 View Deals</Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-toy-card">🚂<p>Trains</p></div>
        <div className="hero-toy-card">🧩<p>Puzzles</p></div>
        <div className="hero-toy-card">🎮<p>Games</p></div>
        <div className="hero-toy-card">🪆<p>Dolls</p></div>
      </div>
    </section>
  );
};

export default Hero;
