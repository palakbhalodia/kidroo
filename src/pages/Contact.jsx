import React, { useState } from 'react';
import { useToast } from '../components/common/Toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your inquiry has been sent! We will contact you soon.', 'success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page container">
      <div className="contact-header">
        <h1>Get in Touch! 🧸</h1>
        <p>Have a question about our toys or your order? We'd love to hear from you.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info-cards">
          <div className="info-card">
            <div className="info-icon"><Phone size={24} /></div>
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
            <p className="subtext">Mon-Fri from 9am to 6pm</p>
          </div>
          <div className="info-card">
            <div className="info-icon"><Mail size={24} /></div>
            <h3>Email Us</h3>
            <p>support@kidroo.com</p>
            <p className="subtext">We'll respond within 24 hours</p>
          </div>
          <div className="info-card">
            <div className="info-icon"><MapPin size={24} /></div>
            <h3>Visit Us</h3>
            <p>123 Toy Street, Fun City</p>
            <p className="subtext">Come play with us!</p>
          </div>
        </div>

        <div className="contact-main">
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-row">
                <div className="input-group">
                  <label>Your Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Message *</label>
                <textarea rows="5" name="message" required value={formData.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{width: '100%'}}>
                <Send size={18} style={{marginRight: '8px'}} /> Send Message
              </button>
            </form>
          </div>

          <div className="contact-map">
            <h2>Our Store Location</h2>
            <iframe 
              title="Kidroo Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64332906803!2d72.74109961918364!3d19.08252231908332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1683889000000!5m2!1sen!2sin" 
              width="100%" 
              height="350" 
              style={{border:0, borderRadius: '16px'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
