import { configureStore } from '@reduxjs/toolkit';
import { authReducer, rootReducer } from './exports';

const store = configureStore({
  reducer: {
    root: rootReducer,
    auth: authReducer,
  },
});

export default store;
