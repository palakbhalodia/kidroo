import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Deals.css';

const DEALS_DATA = [
  { id: 101, name: 'RC Racing Car Pro', price: 2499, oldPrice: 4999, icon: '🏎️', bgColor: '#FFF9C4', initialTime: 3600 * 3 + 42 * 60 + 18 },
  { id: 102, name: 'Dino World Playset', price: 1799, oldPrice: 2999, icon: '🦕', bgColor: '#E8F5E9', initialTime: 3600 * 5 + 10 * 60 + 44 },
  { id: 103, name: 'Mini Toy Guitar', price: 699, oldPrice: 1199, icon: '🎸', bgColor: '#F3E5F5', initialTime: 3600 * 2 + 55 * 60 + 9 },
  { id: 104, name: "Knight's Castle Fortress", price: 3199, oldPrice: 5499, icon: '🏰', bgColor: '#E3F2FD', initialTime: 3600 * 7 + 20 * 60 + 33 },
];

const formatTime = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const DealCard = ({ deal }) => {
  const [timeLeft, setTimeLeft] = useState(deal.initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <Link to={`/product/${deal.id}`} className="deal-card">
      <div className="deal-img" style={{ background: deal.bgColor }}>{deal.icon}</div>
      <div className="deal-info">
        <div className="deal-name">{deal.name}</div>
        <div className="deal-price">
          ₹{deal.price} <span className="old-price">₹{deal.oldPrice}</span>
        </div>
        <div className="deal-timer">⏱️ Ends in: {formatTime(timeLeft)}</div>
      </div>
    </Link>
  );
};

const Deals = () => {
  return (
    <section className="deals-section">
      <div className="container">
        <div className="section-title" style={{ color: '#fff' }}>⏰ Deals of the Day</div>
        <p className="section-sub" style={{ color: '#888', marginBottom: '36px' }}>Hurry! These prices won't last long</p>
        
        <div className="deals-grid">
          {DEALS_DATA.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deals;
