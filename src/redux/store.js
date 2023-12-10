import { configureStore } from '@reduxjs/toolkit';
import { authReducer, systemReducer } from './exports';

const store = configureStore({
  reducer: {
    system: systemReducer,
    auth: authReducer,
  },
});

export default store;
