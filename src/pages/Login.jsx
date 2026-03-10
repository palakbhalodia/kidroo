import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would dispatch to a Redux auth slice or call an API
    
    // Simulate slight delay for auth
    setTimeout(() => {
      // Mock successful login/register
      localStorage.setItem('kidroo_user', JSON.stringify({
        name: isLogin ? 'Demo User' : formData.name,
        email: formData.email
      }));
      
      // Navigate based on user flow: if they came from cart, go to checkout, else go home
      // For simplicity, we just navigate to Home here, but in a real app would use location.state.from
      navigate('/');
    }, 800);
  };

  return (
    <div className="auth-page container">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">🧸 kid<span>roo</span></div>
          <h2>{isLogin ? 'Welcome Back!' : 'Join the Family!'}</h2>
          <p>
            {isLogin 
              ? 'Log in to access your orders, wishlists, and special deals.' 
              : 'Create an account to get a 20% discount on your first order!'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                required={!isLogin} 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="hello@example.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            {isLogin && <a href="#" className="forgot-password">Forgot Password?</a>}
          </div>

          <button type="submit" className="btn-primary auth-btn">
            {isLogin ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
