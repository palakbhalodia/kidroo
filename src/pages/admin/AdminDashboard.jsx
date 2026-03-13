import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../store/slices/productSlice';
import { logout } from '../../store/slices/authSlice';
import { Package, ShoppingBag, DollarSign, Edit, Trash2, X, LogOut } from 'lucide-react';
import { useToast } from '../../components/common/Toast';
import './Admin.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status } = useSelector(state => state.products);
  const { allOrders: orders } = useSelector(state => state.orders);
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Vehicles',
    stockStatus: 'In Stock'
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: 'Vehicles', stockStatus: 'In Stock' });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || 'Vehicles',
      stockStatus: product.stockStatus || 'In Stock'
    });
    setShowModal(true);
  };

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    const baseProduct = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      stockStatus: formData.stockStatus,
      // Default mock fields
      oldPrice: Number(formData.price) + 200,
      ageGroup: '3-5 yrs',
      rating: 5,
      reviews: 0,
      icon: '🧸',
      bgTheme: '#F0F9FF'
    };

    if (editingProduct) {
      dispatch(updateProduct({ ...editingProduct, ...baseProduct }));
      showToast('Product updated successfully!', 'success');
    } else {
      dispatch(addProduct(baseProduct));
      showToast('Product added successfully!', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
      showToast('Product deleted.', 'success');
    }
  };

  const renderDashboard = () => (
    <div className="admin-grid">
      <div className="stat-card">
        <div className="stat-icon"><DollarSign /></div>
        <div className="stat-info">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon"><ShoppingBag /></div>
        <div className="stat-info">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon"><Package /></div>
        <div className="stat-info">
          <h3>Total Toys</h3>
          <p>{products.length}</p>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="admin-table-container">
      <div className="table-header">
        <h2>Manage Toys</h2>
        <button className="btn-primary" onClick={openAddModal}>Add New Toy</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>#{product.id}</td>
              <td style={{fontWeight: 600}}>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>
                <span className={`stock ${product.stockStatus === 'Out of Stock' ? 'out-of-stock' : 'in-stock'}`}>
                  {product.stockStatus || 'In Stock'}
                </span>
              </td>
              <td>
                <button className="action-btn edit" 
                title="Edit" 
                onClick={() => openEditModal(product)}>
                <Edit size={16} /></button>
                <button className="action-btn delete" 
                title="Delete" 
                onClick={() => handleDelete(product.id)}>
                <Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrders = () => (
    <div className="admin-table-container">
      <h2>Recent Orders</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Email</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No orders yet.</td></tr>
          ) : (
            orders.map(order => (
              <tr key={order.orderId}>
                <td style={{fontWeight: 700}}>{order.orderId}</td>
                <td>{order.userEmail}</td>
                <td>{order.date}</td>
                <td><span className="status-badge arriving">{order.status}</span></td>
                <td style={{color: 'var(--green)', fontWeight: 700}}>₹{order.total}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const handleLogout = () => {
    dispatch(logout());
    showToast('Logged out successfully.', 'success');
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-icon">🧸</span> Kidroo<br/><small>Admin Panel</small>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="exit-admin logout-btn" style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <LogOut size={16} /> Logout
          </button>
          <a href="/" className="exit-admin" style={{ marginTop: '15px' }}>← Back to Store</a>
        </div>
      </aside>
      
      <main className="admin-content">
        <header className="admin-topbar">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Overview</h2>
          <div className="admin-profile">
            <span className="admin-avatar">A</span> Manager
          </div>
        </header>

        <div className="admin-body">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
        </div>
 
      </main>

      {/* Product Add/Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <header className="modal-header">
              <h2>{editingProduct ? 'Edit Toy' : 'Add New Toy'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </header>
            <form onSubmit={handleCreateOrUpdate} className="modal-form">
              <div className="form-group">
                <label>Toy Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Magic Steam Train"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input 
                  type="number" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  placeholder="e.g. 999"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Vehicles">Vehicles</option>
                  <option value="Puzzles">Puzzles</option>
                  <option value="Dolls">Dolls</option>
                  <option value="STEM Kits">STEM Kits</option>
                  <option value="Action Figures">Action Figures</option>
                  <option value="Music">Music</option>
                  <option value="Educational">Educational</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Stock Status</label>
                <select 
                  value={formData.stockStatus} 
                  onChange={e => setFormData({...formData, stockStatus: e.target.value})}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingProduct ? 'Save Changes' : 'Add Toy'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
