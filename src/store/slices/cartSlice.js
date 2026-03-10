import { createSlice } from '@reduxjs/toolkit';

// Try to load cart from local storage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('kidroo_cart');
    if (serializedCart === null) {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
    return JSON.parse(serializedCart);
  } catch {
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      state.totalQuantity++;
      state.totalAmount += newItem.price;

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      
      localStorage.setItem('kidroo_cart', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
        
        localStorage.setItem('kidroo_cart', JSON.stringify(state));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('kidroo_cart');
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
