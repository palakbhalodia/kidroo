import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import PromoBanners from '../components/home/PromoBanners';
import Deals from '../components/home/Deals';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const trendingToys = useMemo(() => items.slice(0, 4), [items]);

  return (
    <div className="home-page">
      <Hero />
      <Categories />

      <section className="section trending-section">
        <div className="container">
          <div className="section-title">
            <span className="dot" style={{ background: 'var(--blue)' }}></span>
            Trending Toys
          </div>
          <p className="section-sub">Bestsellers loved by kids and parents alike</p>

          {status === 'loading' && <Loader />}
          {status === 'failed' && (
            <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts())} />
          )}
          {status === 'succeeded' && (
            <div className="products-grid">
              {trendingToys.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PromoBanners />
      <Deals />

      {/* Reviews */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-title" style={{ padding: '0 0 8px' }}>
            <span className="dot" style={{ background: 'var(--purple)' }}></span>
            What Parents Say
          </div>
          <p className="section-sub">Real reviews from happy families ❤️</p>

          <div className="reviews-grid">
            {[
              { initials: 'P', name: 'Priya Sharma', location: 'Mumbai', color: 'var(--blue)', text: 'My son absolutely loves the RC car we ordered! Arrived in 2 days, packaging was great, and the quality is amazing.' },
              { initials: 'R', name: 'Rahul Mehta', location: 'Ahmedabad', color: 'var(--green)', text: 'The STEM kit kept my daughter busy for hours! It\'s educational and so much fun. The instructions were clear and easy.' },
              { initials: 'A', name: 'Anita Desai', location: 'Delhi', color: 'var(--orange)', text: 'Fantastic selection of educational toys! The puzzle quality is brilliant and has survived my toddler dropping it multiple times.' },
            ].map(r => (
              <div key={r.name} className="review-card">
                <div className="quote">"</div>
                <p>{r.text}</p>
                <div className="reviewer">
                  <div className="avatar" style={{ background: r.color }}>{r.initials}</div>
                  <div>
                    <div className="reviewer-name">{r.name}</div>
                    <div className="reviewer-sub">⭐⭐⭐⭐⭐ · {r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="newsletter">
        <div className="container">
          <h2>Join the Kidroo Family!</h2>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="nl-form">
            <input type="email" className="nl-input" placeholder="Enter your email address..." />
            <button className="nl-btn">Subscribe 🎉</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
