import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { selectUserOrders } from '../store/slices/orderSlice';
import { Package, Heart, LogOut } from 'lucide-react';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // Safe get for user email assuming user exists when authenticated
  const userOrders = useSelector((state) => selectUserOrders(state, user?.email));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated || !user) return null;

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
            
            {userOrders.length === 0 ? (
              <div className="empty-orders-state">
                <Package size={48} style={{ color: '#ccc', marginBottom: '16px' }} />
                <h3>No past orders</h3>
                <p>You haven't placed any orders yet.</p>
                <Link to="/shop" className="btn-primary" style={{marginTop: '16px'}}>Start Shopping</Link>
              </div>
            ) : (
              <div className="orders-list">
                {userOrders.map((order) => (
                  <div key={order.orderId} className="order-history-card">
                    <div className="order-history-header">
                      <div>
                        <span className="oh-label">Order Placed</span>
                        <div className="oh-value">{order.date}</div>
                      </div>
                      <div>
                        <span className="oh-label">Total</span>
                        <div className="oh-value">₹{order.total}</div>
                      </div>
                      <div className="oh-right">
                        <span className="oh-label">Order #</span>
                        <div className="oh-value">{order.orderId}</div>
                      </div>
                    </div>
                    
                    <div className="order-history-body">
                      <div className="oh-status tracking">
                        <span className="status-dot"></span> {order.status}
                      </div>
                      
                      <div className="oh-items">
                        {order.items.map((item) => (
                          <div key={item.id} className="oh-item">
                            <div className="oh-img" style={{background: item.bgTheme || '#FFF3E0'}}>{item.icon || '🧸'}</div>
                            <div className="oh-info">
                              <div className="oh-name">{item.name}</div>
                              <div className="oh-qty">Qty: {item.quantity}</div>
                              <Link to={`/product/${item.id}`} className="buy-again-link">Buy it again</Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="oh-actions">
                        <button className="btn-secondary oh-btn">Track Package</button>
                        <button className="btn-secondary oh-btn">View Invoice</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
