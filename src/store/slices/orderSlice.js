import { createSlice } from '@reduxjs/toolkit';

const loadOrdersFromStorage = () => {
  try {
    const orders = localStorage.getItem('kidroo_orders_db');
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
};

const initialState = {
  allOrders: loadOrdersFromStorage(),
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // payload shape: { userEmail, orderId, items, total, date, status }
      state.allOrders.unshift(action.payload); // push to front so newest is first
      localStorage.setItem('kidroo_orders_db', JSON.stringify(state.allOrders));
    },
  },
});

export const { addOrder } = orderSlice.actions;

// Selector to get orders for a specific user
export const selectUserOrders = (state, email) => {
  return state.orders.allOrders.filter(order => order.userEmail === email);
};

export default orderSlice.reducer;
