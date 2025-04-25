import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkups: [],
  checkup: null,
  loading: true,
  error: {}
};

const checkupSlice = createSlice({
    name: 'checkups',
    initialState,
    reducers: {
      getCheckupsSuccess: (state, action) => {
        state.checkups = action.payload;
        state.loading = false;
      },
      getCheckupSuccess: (state, action) => {
        state.checkup = action.payload;
        state.loading = false;
      },
      createCheckupSuccess: (state, action) => {
        console.log('Creating checkup with payload:', action.payload);
        state.checkups = [action.payload, ...state.checkups];
        state.loading = false;
      },
      updateCheckupSuccess: (state, action) => {
        console.log('Updating checkup with payload:', action.payload);
        state.checkup = action.payload;
        state.checkups = state.checkups.map(checkup => 
          checkup._id === action.payload._id ? action.payload : checkup
        );
        state.loading = false;
      },
      uploadImagesSuccess: (state, action) => {
        console.log('Uploading images for checkup:', action.payload);
        state.checkup = action.payload;
        state.checkups = state.checkups.map(checkup => 
          checkup._id === action.payload._id ? action.payload : checkup
        );
        state.loading = false;
      },
      checkupError: (state, action) => {
        console.error('Checkup error:', action.payload);
        state.error = action.payload; // Ensure this does not modify checkups
        state.loading = false;        
      },
      clearCheckup: (state) => {
        state.checkup = null;
      }
    }
  });


export const {
  getCheckupsSuccess,
  getCheckupSuccess,
  createCheckupSuccess,
  updateCheckupSuccess,
  uploadImagesSuccess,
  checkupError,
  clearCheckup
} = checkupSlice.actions;

export default checkupSlice.reducer;
