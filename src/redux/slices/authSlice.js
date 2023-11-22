import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      id: null,
      role: null,
      isLogged: false,
      token: null,
    },
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
    },
    clearToken: (state) => {
      state.token = null;
      state.isLogged = false;
    },
  },
});

export const { setId, setRole, login, logout } = authSlice.actions;

export default authSlice.reducer;
