import React from 'react';
import './Categories.css';

const CATEGORY_DATA = [
  { id: 1, name: 'Vehicles', icon: '🚗', count: '240+ items', bgColor: '#FFF3E0', colorClass: 'cat1' },
  { id: 2, name: 'Puzzles', icon: '🧩', count: '180+ items', bgColor: '#E3F2FD', colorClass: 'cat2' },
  { id: 3, name: 'Dolls', icon: '🪆', count: '310+ items', bgColor: '#F3E5F5', colorClass: 'cat3' },
  { id: 4, name: 'Art & Craft', icon: '🎨', count: '150+ items', bgColor: '#E8F5E9', colorClass: 'cat4' },
  { id: 5, name: 'Board Games', icon: '🎮', count: '90+ items', bgColor: '#FCE4EC', colorClass: 'cat5' },
  { id: 6, name: 'STEM Kits', icon: '🔬', count: '120+ items', bgColor: '#FFFDE7', colorClass: 'cat6' },
];

const Categories = () => {
  return (
    <section className="section categories-section">
      <div className="container">
        <div className="section-title">
          <span className="dot" style={{ background: 'var(--orange)' }}></span>
          Shop by Category
        </div> 
        <p className="section-sub">Find the perfect toy for every type of play</p>        
        <div className="categories-grid">
          {CATEGORY_DATA.map((cat) => (
            <div key={cat.id} className={`cat-card ${cat.colorClass}`} style={{ backgroundColor: cat.bgColor }}>
              <span className="icon">{cat.icon}</span>
              <div className="name">{cat.name}</div>
              <div className="count">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
