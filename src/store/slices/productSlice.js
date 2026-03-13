import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMockProducts } from '../../services/mockApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const stored = localStorage.getItem('kidroo_products_db');
      if (stored) return JSON.parse(stored);
      
      const response = await fetchMockProducts();
      localStorage.setItem('kidroo_products_db', JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: Date.now() };
      state.items.unshift(newProduct);
      localStorage.setItem('kidroo_products_db', JSON.stringify(state.items));
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('kidroo_products_db', JSON.stringify(state.items));
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem('kidroo_products_db', JSON.stringify(state.items));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
