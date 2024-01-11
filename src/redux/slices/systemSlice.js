import { createSlice } from '@reduxjs/toolkit'
import { language, theme } from '../../utils/constants/system'

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    language: language.english,
    theme: theme.light
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    }
  }
})

export const { setLanguage, setTheme } = systemSlice.actions

export default systemSlice.reducer
