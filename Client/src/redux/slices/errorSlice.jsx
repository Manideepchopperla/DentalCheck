import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  status: null,
  id: null
};

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.id = action.payload.id;
    },
    clearError: (state) => {
      state.message = null;
      state.status = null;
      state.id = null;
    }
  }
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;