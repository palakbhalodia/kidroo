import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, [items]);

  const displayedProducts = useMemo(() => {
    let filtered = [...items];
    
    if (filter !== 'All') {
      filtered = filtered.filter(item => item.category === filter);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.category.toLowerCase().includes(lowerQuery)
      );
    }
    
    switch (sort) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Top Rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'Featured' - no explicit sort, keep original order
        break;
    }
    
    return filtered;
  }, [items, filter, sort, query]);

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1>All Toys</h1>
        <p>Explore our complete collection of fun and educational toys.</p>
      </div>
      
      <div className="shop-controls">
        <div className="shop-filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="shop-sort">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>

      {status === 'loading' && <Loader />}
      {status === 'failed' && <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts())} />}
      
      {status === 'succeeded' && (
        <div className="shop-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <h3>No toys found in this category!</h3>
              <button className="btn-primary" onClick={() => setFilter('All')} style={{marginTop: '20px'}}>View All Toys</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
