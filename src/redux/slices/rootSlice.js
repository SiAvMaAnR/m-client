import { createSlice } from '@reduxjs/toolkit';

export const rootSlice = createSlice({
  name: 'root',
  initialState: {
    language: 'en',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = rootSlice.actions;

export default rootSlice.reducer;
