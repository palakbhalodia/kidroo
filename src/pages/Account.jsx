import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Heart, LogOut } from 'lucide-react';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    const userData = localStorage.getItem('kidroo_user');
    
    if (mounted) {
      if (userData) {
        try {
           setUser(JSON.parse(userData));
        } catch {
           setUser({ name: 'Guest User', email: 'guest@example.com' });
        }
      } else {
        // For demo purposes, auto-mock if no user rather than strictly redirecting
        setUser({ name: 'Guest User', email: 'guest@example.com' });
      }
    }
    
    return () => { mounted = false; };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('kidroo_user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="account-page container">
      <div className="account-header">
        <h1>My Account</h1>
        <p>Welcome back, <strong>{user.name}</strong>!</p>
      </div>

      <div className="account-layout">
        <div className="account-sidebar">
          <button className="sidebar-link active">
            <Package size={20} /> My Orders
          </button>
          <button className="sidebar-link">
            <Heart size={20} /> Wishlist
          </button>
          <button className="sidebar-link logout" onClick={handleLogout}>
            <LogOut size={20} /> Log Out
          </button>
        </div>

        <div className="account-content">
          <div className="content-section">
            <h2>Recent Orders</h2>
            
            <div className="order-history-card">
              <div className="order-history-header">
                <div>
                  <span className="oh-label">Order Placed</span>
                  <div className="oh-value">Oct 12, 2026</div>
                </div>
                <div>
                  <span className="oh-label">Total</span>
                  <div className="oh-value">₹849</div>
                </div>
                <div className="oh-right">
                  <span className="oh-label">Order #</span>
                  <div className="oh-value">KIDROO-982341</div>
                </div>
              </div>
              
              <div className="order-history-body">
                <div className="oh-status tracking">
                  <span className="status-dot"></span> Arriving Tomorrow
                </div>
                
                <div className="oh-items">
                  <div className="oh-item">
                    <div className="oh-img" style={{background: '#FFF3E0'}}>🚂</div>
                    <div className="oh-info">
                      <div className="oh-name">Magic Steam Engine Set</div>
                      <Link to="/product/1" className="buy-again-link">Buy it again</Link>
                    </div>
                  </div>
                </div>
                
                <div className="oh-actions">
                  <button className="btn-secondary oh-btn">Track Package</button>
                  <button className="btn-secondary oh-btn">View Invoice</button>
                </div>
              </div>
            </div>

            {/* Empty state example for past orders */}
            <div className="empty-orders-state" style={{ display: 'none' }}>
              <Package size={48} style={{ color: '#ccc', marginBottom: '16px' }} />
              <h3>No past orders</h3>
              <p>You haven't placed any orders yet.</p>
              <Link to="/shop" className="btn-primary" style={{marginTop: '16px'}}>Start Shopping</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
