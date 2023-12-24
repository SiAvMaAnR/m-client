import { createSlice } from '@reduxjs/toolkit'

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    language: 'en',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = systemSlice.actions

export default systemSlice.reducer
