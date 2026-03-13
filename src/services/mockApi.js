// Mock Data
const MOCK_PRODUCTS = [
  { id: 1, name: 'Magic Steam Engine Set', price: 799, oldPrice: 1299, age: '3+', ageGroup: '3-5 yrs', category: 'Vehicles', rating: 5, reviews: 128, icon: '🚂', isHot: true, isNew: false, isTop: false, bgTheme: '#FFF3E0' },
  { id: 2, name: '3D Dinosaur Puzzle 100pc', price: 549, oldPrice: 899, age: '5+', ageGroup: '3-5 yrs', category: 'Puzzles', rating: 4, reviews: 84, icon: '🧩', isHot: false, isNew: true, isTop: false, bgTheme: '#E8F5E9' },
  { id: 3, name: 'Princess Castle Doll Set', price: 1299, oldPrice: 1999, age: '2+', ageGroup: '0-2 yrs', category: 'Dolls', rating: 5, reviews: 203, icon: '🪆', isHot: false, isNew: false, isTop: true, bgTheme: '#FCE4EC' },
  { id: 4, name: 'Junior Science Lab Kit', price: 1499, oldPrice: 2200, age: '8+', ageGroup: '6-9 yrs', category: 'STEM Kits', rating: 5, reviews: 67, icon: '🔬', isHot: false, isNew: true, isTop: false, bgTheme: '#E3F2FD' },
  { id: 5, name: 'RC Racing Car Pro', price: 2499, oldPrice: 4999, age: '6+', ageGroup: '6-9 yrs', category: 'Vehicles', rating: 4.5, reviews: 312, icon: '🏎️', isHot: true, isNew: false, isTop: true, bgTheme: '#FFF9C4' },
  { id: 6, name: 'Dino World Playset', price: 1799, oldPrice: 2999, age: '4+', ageGroup: '3-5 yrs', category: 'Action Figures', rating: 4, reviews: 154, icon: '🦕', isHot: false, isNew: false, isTop: false, bgTheme: '#E8F5E9' },
  { id: 7, name: 'Mini Toy Guitar', price: 699, oldPrice: 1199, age: '3+', ageGroup: '3-5 yrs', category: 'Music', rating: 4.5, reviews: 92, icon: '🎸', isHot: false, isNew: true, isTop: false, bgTheme: '#F3E5F5' },
  { id: 8, name: "Knight's Castle Fortress", price: 3199, oldPrice: 5499, age: '7+', ageGroup: '6-9 yrs', category: 'Playsets', rating: 5, reviews: 45, icon: '🏰', isHot: true, isNew: false, isTop: false, bgTheme: '#E3F2FD' },
  { id: 9, name: 'Classic Wooden Blocks', price: 899, oldPrice: 1499, age: '1+', ageGroup: '0-2 yrs', category: 'Educational', rating: 4.8, reviews: 210, icon: '🧱', isHot: false, isNew: false, isTop: true, bgTheme: '#FFF3E0' },
  { id: 10, name: 'Kids Learning Tablet', price: 1999, oldPrice: 2999, age: '4+', ageGroup: '3-5 yrs', category: 'Educational', rating: 4.2, reviews: 88, icon: '📱', isHot: true, isNew: true, isTop: false, bgTheme: '#E3F2FD' },
  { id: 11, name: 'Super Hero Action Figure', price: 499, oldPrice: 899, age: '6+', ageGroup: '6-9 yrs', category: 'Action Figures', rating: 4.7, reviews: 150, icon: '🦸', isHot: false, isNew: false, isTop: false, bgTheme: '#FCE4EC' },
  { id: 12, name: 'Outdoor Play Tent', price: 1599, oldPrice: 2499, age: '3+', ageGroup: '3-5 yrs', category: 'Outdoor', rating: 4.9, reviews: 320, icon: '⛺', isHot: true, isNew: false, isTop: true, bgTheme: '#E8F5E9' },
  { id: 13, name: 'Magnetic Tiles Builder', price: 2199, oldPrice: 3500, age: '4+', ageGroup: '3-5 yrs', category: 'STEM Kits', rating: 5.0, reviews: 410, icon: '🧲', isHot: false, isNew: true, isTop: true, bgTheme: '#FFF9C4' },
  { id: 14, name: 'Interactive Robot Pet', price: 3499, oldPrice: 5999, age: '8+', ageGroup: '6-9 yrs', category: 'Electronic', rating: 4.6, reviews: 95, icon: '🤖', isHot: true, isNew: false, isTop: false, bgTheme: '#E3F2FD' },
  { id: 15, name: 'Art & Craft Painting Set', price: 599, oldPrice: 999, age: '6+', ageGroup: '6-9 yrs', category: 'Arts', rating: 4.4, reviews: 60, icon: '🎨', isHot: false, isNew: false, isTop: false, bgTheme: '#FCE4EC' },
  { id: 16, name: 'Toddler Ride-on Car', price: 2999, oldPrice: 4500, age: '2+', ageGroup: '0-2 yrs', category: 'Vehicles', rating: 4.8, reviews: 180, icon: '🚙', isHot: false, isNew: false, isTop: true, bgTheme: '#FFF3E0' },
  { id: 17, name: 'Soft Plush Bear', price: 399, oldPrice: 599, age: '0+', ageGroup: '0-2 yrs', category: 'Dolls', rating: 5.0, reviews: 500, icon: '🧸', isHot: true, isNew: false, isTop: true, bgTheme: '#E8F5E9' },
  { id: 18, name: 'Giant Floor Puzzle', price: 799, oldPrice: 1200, age: '4+', ageGroup: '3-5 yrs', category: 'Puzzles', rating: 4.5, reviews: 110, icon: '🧩', isHot: false, isNew: true, isTop: false, bgTheme: '#F3E5F5' },
  { id: 19, name: 'Kids Drum Set', price: 1899, oldPrice: 2899, age: '5+', ageGroup: '3-5 yrs', category: 'Music', rating: 4.3, reviews: 75, icon: '🥁', isHot: false, isNew: false, isTop: false, bgTheme: '#FFF9C4' },
  { id: 20, name: 'Stargazer Telescope', price: 4299, oldPrice: 6999, age: '10+', ageGroup: '10+ yrs', category: 'STEM Kits', rating: 4.9, reviews: 205, icon: '🔭', isHot: true, isNew: true, isTop: true, bgTheme: '#E3F2FD' }
];

export const fetchMockProducts = () => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate random api failure 5% of the time to test error handling
      if (Math.random() < 0.05) {
        reject(new Error('Failed to fetch products. Please try again later.'));
      } else {
        resolve(MOCK_PRODUCTS);
      }
    }, 1000);
  });
};

export const fetchMockProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found!'));
      }
    }, 800);
  });
};
