import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { ToastProvider } from './components/common/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Account from './pages/Account';
import OrderConfirmed from './pages/OrderConfirmed';
import Deals from './pages/Deals';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useMockAnalytics } from './hooks/useMockAnalytics';

// Helper component to run analytics hooks
const AppEffectRunner = () => {
  useMockAnalytics();
  return null;
};

// Helper component to update document title based on routes
const PageTitleUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    let title = "Kidroo Toy Store";
    const path = location.pathname;
    
    if (path === '/') title = "Kidroo - Where Fun Begins";
    else if (path.startsWith('/shop')) title = "Shop Toys | Kidroo";
    else if (path === '/deals') title = "Special Offers & Deals | Kidroo";
    else if (path === '/about') title = "About Us | Kidroo";
    else if (path === '/contact') title = "Contact Us | Kidroo";
    else if (path.startsWith('/product/')) title = "Buy Toy | Kidroo";
    else if (path === '/cart') title = "Your Toy Box | Kidroo";
    else if (path === '/checkout') title = "Secure Checkout | Kidroo";
    else if (path === '/login') title = "Sign In | Kidroo";
    else if (path === '/account') title = "My Account | Kidroo";
    else if (path.startsWith('/admin')) title = "Admin Dashboard | Kidroo";
    
    document.title = title;
  }, [location]);

  return null;
};

// Component to wrap user-facing pages in the MainLayout
const StoreRoutes = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/order-confirmed" element={<OrderConfirmed />} />
    </Routes>
  </MainLayout>
);

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppEffectRunner />
        <PageTitleUpdater />
        <Routes>
          {/* Admin Routes with distinct layout */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute isAdminRequired={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Main Storefront Routes */}
          <Route path="/*" element={<StoreRoutes />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
