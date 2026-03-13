import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const images = [
  'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1566589345758-1f19f2ba955a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="photo-gallery-section">
      <div className="container">
        <div className="section-title">
          <span className="dot" style={{ background: 'var(--red)' }}></span>
          Our Toy Wonderland
        </div>
        <p className="section-sub">Explore our magical world of toys through our gallery</p>
        <div className="gallery-slider">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`slide ${idx === currentIndex ? 'active' : ''}`}
            >
              <img src={img} alt={`Gallery Slide ${idx + 1}`} />
            </div>
          ))}
          <div className="slider-controls">
            <div className="slider-dots">
              {images.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`dot-btn ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
