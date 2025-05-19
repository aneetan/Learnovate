// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

// Configure persist
const persistConfig = {
  key: 'user',
  storage,
};

// Wrap your reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Create store with persist support
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export store and persistor
export const persistor = persistStore(store);
export default store;
