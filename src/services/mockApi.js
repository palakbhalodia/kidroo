// Mock Data
const MOCK_PRODUCTS = [
  { id: 1, name: 'Magic Steam Engine Set', price: 799, oldPrice: 1299, age: '3+', category: 'Vehicles', rating: 5, reviews: 128, icon: '🚂', isHot: true, isNew: false, isTop: false, bgTheme: '#FFF3E0' },
  { id: 2, name: '3D Dinosaur Puzzle 100pc', price: 549, oldPrice: 899, age: '5+', category: 'Puzzles', rating: 4, reviews: 84, icon: '🧩', isHot: false, isNew: true, isTop: false, bgTheme: '#E8F5E9' },
  { id: 3, name: 'Princess Castle Doll Set', price: 1299, oldPrice: 1999, age: '2+', category: 'Dolls', rating: 5, reviews: 203, icon: '🪆', isHot: false, isNew: false, isTop: true, bgTheme: '#FCE4EC' },
  { id: 4, name: 'Junior Science Lab Kit', price: 1499, oldPrice: 2200, age: '8+', category: 'STEM Kits', rating: 5, reviews: 67, icon: '🔬', isHot: false, isNew: true, isTop: false, bgTheme: '#E3F2FD' },
  { id: 5, name: 'RC Racing Car Pro', price: 2499, oldPrice: 4999, age: '6+', category: 'Vehicles', rating: 4.5, reviews: 312, icon: '🏎️', isHot: true, isNew: false, isTop: true, bgTheme: '#FFF9C4' },
  { id: 6, name: 'Dino World Playset', price: 1799, oldPrice: 2999, age: '4+', category: 'Figures', rating: 4, reviews: 154, icon: '🦕', isHot: false, isNew: false, isTop: false, bgTheme: '#E8F5E9' },
  { id: 7, name: 'Mini Toy Guitar', price: 699, oldPrice: 1199, age: '3+', category: 'Music', rating: 4.5, reviews: 92, icon: '🎸', isHot: false, isNew: true, isTop: false, bgTheme: '#F3E5F5' },
  { id: 8, name: "Knight's Castle Fortress", price: 3199, oldPrice: 5499, age: '7+', category: 'Playsets', rating: 5, reviews: 45, icon: '🏰', isHot: true, isNew: false, isTop: false, bgTheme: '#E3F2FD' },
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
