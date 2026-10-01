import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import taskReducer from './taskslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;