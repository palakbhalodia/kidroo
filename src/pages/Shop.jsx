import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import PromoBanners from '../components/home/PromoBanners';
import { Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'All';
  const urlAgeRaw = searchParams.get('age') || '';

  const mapUrlAge = (ageStr) => {
    if (ageStr === '0-2') return '0-2 yrs';
    if (ageStr === '3-5') return '3-5 yrs';
    if (ageStr === '6-9') return '6-9 yrs';
    if (ageStr === '10') return '10+ yrs';
    return 'All';
  };

  const urlAge = urlAgeRaw ? mapUrlAge(urlAgeRaw) : 'All';

  const [categoryFilter, setCategoryFilter] = useState(urlCategory);
  const [ageFilter, setAgeFilter] = useState(urlAge);
  const [priceFilter, setPriceFilter] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setCategoryFilter(urlCategory);
    setAgeFilter(urlAge);
    setCurrentPage(1);
  }, [urlCategory, urlAge, query]);

  // Handle pagination reset on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, ageFilter, priceFilter, sort]);

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return ['All', ...Array.from(cats)].sort();
  }, [items]);

  const ageGroups = ['All', '0-2 yrs', '3-5 yrs', '6-9 yrs', '10+ yrs'];
  const priceRanges = [
    { label: 'All', min: 0, max: 100000 },
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: 'Above ₹2000', min: 2000, max: 100000 },
  ];

  const displayedProducts = useMemo(() => {
    let filtered = [...items];
    
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (ageFilter !== 'All') {
      filtered = filtered.filter(item => item.ageGroup === ageFilter);
    }

    const priceBoundaries = priceRanges.find(p => p.label === priceFilter) || priceRanges[0];
    filtered = filtered.filter(item => item.price >= priceBoundaries.min && item.price <= priceBoundaries.max);

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
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    
    return filtered;
  }, [items, categoryFilter, ageFilter, priceFilter, sort, query]);

  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
  const currentProducts = displayedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClearFilters = () => {
    setCategoryFilter('All');
    setAgeFilter('All');
    setPriceFilter('All');
    setSort('Featured');
  };

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1>{query ? `Search Results for "${query}"` : 'All Toys'}</h1>
        <p>Explore our complete collection of fun and educational toys.</p>
        <button className="mobile-filter-btn btn-secondary" onClick={() => setShowMobileFilters(true)}>
          <Filter size={18} /> Filters
        </button>
      </div>

      <PromoBanners />
      
      <div className="shop-layout" style={{marginTop: '30px'}}>
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${showMobileFilters ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setShowMobileFilters(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {categories.map(cat => (
              <label key={cat} className="filter-radio">
                <input 
                  type="radio" 
                  name="category" 
                  value={cat} 
                  checked={categoryFilter === cat}
                  onChange={(e) => setCategoryFilter(e.target.value)} 
                />
                {cat}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Age Group</h4>
            {ageGroups.map(age => (
              <label key={age} className="filter-radio">
                <input 
                  type="radio" 
                  name="age" 
                  value={age} 
                  checked={ageFilter === age}
                  onChange={(e) => setAgeFilter(e.target.value)} 
                />
                {age}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            {priceRanges.map(pr => (
              <label key={pr.label} className="filter-radio">
                <input 
                  type="radio" 
                  name="price" 
                  value={pr.label} 
                  checked={priceFilter === pr.label}
                  onChange={(e) => setPriceFilter(e.target.value)} 
                />
                {pr.label}
              </label>
            ))}
          </div>

          <button className="btn-secondary clear-btn" onClick={handleClearFilters}>Clear All Filters</button>
        </aside>

        {/* Main Content */}
        <div className="shop-main">
          <div className="shop-controls">
            <div className="results-count">
              Showing {currentProducts.length} of {displayedProducts.length} results
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
            <>
              <div className="shop-grid">
                {currentProducts.length > 0 ? (
                  currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="no-products">
                    <h3>No toys match your filters!</h3>
                    <button className="btn-primary" onClick={handleClearFilters} style={{marginTop: '20px'}}>Clear Filters</button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="page-btn" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button 
                      key={idx + 1} 
                      className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button 
                    className="page-btn" 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
