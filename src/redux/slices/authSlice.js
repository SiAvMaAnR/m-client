import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    role: null,
    isLogged: false,
    token: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    login: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLogged = false;
    },
  },
});

export const { setId, setRole, login, logout } = authSlice.actions;

export default authSlice.reducer;
