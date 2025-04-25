import { setError as setErrorAction, clearError as clearErrorAction } from '../slices/errorSlice';

// Set error
export const setError = (message, status, id) => dispatch => {
  dispatch(setErrorAction({ message, status, id }));
};

// Clear error
export const clearError = () => dispatch => {
  dispatch(clearErrorAction());
};