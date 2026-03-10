import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page container">
      <div className="about-hero">
        <div className="about-hero-text">
          <h1>Our Story</h1>
          <p>Inspiring imagination and joy in every child since 2024.</p>
        </div>
        <div className="about-hero-img">
          🧸
        </div>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Mission</h2>
          <p>
            At Kidroo, we believe play is the most important work of childhood. 
            Our mission is to provide safe, educational, and endlessly fun toys 
            that spark creativity and foster developmental growth for children of all ages.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">🌿</span>
              <h3>Eco-Friendly</h3>
              <p>We source toys made from sustainable materials that are safe for kids and the planet.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🛡️</span>
              <h3>Safety Certified</h3>
              <p>Every toy passes rigorous, industry-leading safety standards before reaching your home.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🧠</span>
              <h3>Skill Building</h3>
              <p>Our collection is curated to enhance motor skills, cognitive development, and creativity.</p>
            </div>
          </div>
        </div>

        <div className="about-section contact-info">
          <h2>Get In Touch</h2>
          <p>Have questions? We'd love to hear from you!</p>
          <ul>
            <li>Email: hello@kidroo.com</li>
            <li>Phone: +91 1800-KID-ROO</li>
            <li>Address: 123 Playful Lane, Toytown, IN 400001</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
