import { createSlice } from '@reduxjs/toolkit';

// Get currently active user session
const loadActiveSession = () => {
  try {
    const session = localStorage.getItem('kidroo_active_session');
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

// Get the mock "database" of registered users
const loadUsersDb = () => {
  const defaultAdmin = { email: 'admin@kidroo.com', password: 'admin', name: 'Kidroo Admin', isAdmin: true };
  try {
    const db = localStorage.getItem('kidroo_users_db');
    if (db) {
      const parsedDb = JSON.parse(db);
      // Ensure admin exists in DB
      if (!parsedDb.find(u => u.isAdmin)) {
        parsedDb.push(defaultAdmin);
        localStorage.setItem('kidroo_users_db', JSON.stringify(parsedDb));
      }
      return parsedDb;
    }
    const initDb = [defaultAdmin];
    localStorage.setItem('kidroo_users_db', JSON.stringify(initDb));
    return initDb;
  } catch {
    return [defaultAdmin];
  }
};
                
const initialState = {
  user: loadActiveSession(),
  isAuthenticated: !!localStorage.getItem('kidroo_active_session'),
  usersDb: loadUsersDb(),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { email, password, name } = action.payload;
      
      // Check if user already exists
      const existingUser = state.usersDb.find(u => u.email === email);
      if (existingUser) {
        state.error = 'An account with this email already exists.';
        return;
      }
      
      const newUser = { email, password, name };
      state.usersDb.push(newUser);
      localStorage.setItem('kidroo_users_db', JSON.stringify(state.usersDb));
      
      // Auto-login after registration
      state.user = { email, name };
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('kidroo_active_session', JSON.stringify(state.user));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      
      const user = state.usersDb.find(u => u.email === email);
      if (!user) {
        state.error = 'No account found with this email. Please sign up first.';
        return;
      }
      
      if (user.password !== password) {
        state.error = 'Incorrect password. Please try again.';
        return;
      }
      
      // Login successful
      state.user = { email: user.email, name: user.name, isAdmin: user.isAdmin || false };
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('kidroo_active_session', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('kidroo_active_session');
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
});

export const { register, login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
