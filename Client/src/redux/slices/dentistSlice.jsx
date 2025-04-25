import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dentists: [],
  dentist: null,
  loading: true,
  error: {}
};

const dentistSlice = createSlice({
  name: 'dentists',
  initialState,
  reducers: {
    getDentistsSuccess: (state, action) => {
      state.dentists = action.payload;
      state.loading = false;
    },
    getDentistSuccess: (state, action) => {
      state.dentist = action.payload;
      state.loading = false;
    },
    dentistError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getDentistsSuccess,
  getDentistSuccess,
  dentistError
} = dentistSlice.actions;

export default dentistSlice.reducer;