import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push(newItem);
        state.totalQuantity++;
      } else {
        state.items = state.items.filter((item) => item.id !== newItem.id);
        state.totalQuantity--;
      }
    },
    removeWishlistItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity--;
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { toggleWishlistItem, removeWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
