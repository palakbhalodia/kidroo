import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearAuthError } from '../store/slices/authSlice';
import { useToast } from '../components/common/Toast';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const { showToast } = useToast();
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

  // Clear auth errors when switching tabs
  useEffect(() => {
    dispatch(clearAuthError());
  }, [isLogin, dispatch]);

  // Navigate away if authenticated successfully
  useEffect(() => {
    if (isAuthenticated) {
      showToast(isLogin ? "Welcome back to Kidroo!" : "Account created successfully!", "success");
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location, showToast, isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      dispatch(login({ email: formData.email, password: formData.password }));
    } else {
      dispatch(register({ 
        email: formData.email, 
        password: formData.password, 
        name: formData.name 
      }));
    }
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

        {error && <div className="auth-error-message">{error}</div>}

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
