import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/authSlice';
import dentistReducer from './slices/dentistSlice';
import checkupReducer from './slices/checkupSlice';
import errorReducer from './slices/errorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  dentists: dentistReducer,
  checkups: checkupReducer,
  errors: errorReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'dentists', 'checkups']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export default store;
