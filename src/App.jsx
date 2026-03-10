import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/about" element={<About />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
