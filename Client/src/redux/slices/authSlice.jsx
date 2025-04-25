import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    registerSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    authError: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    }
  }
});

export const {
  userLoaded,
  registerSuccess,
  loginSuccess,
  updateProfileSuccess,
  authError,
  logout
} = authSlice.actions;

export default authSlice.reducer;