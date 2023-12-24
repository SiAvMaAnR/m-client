import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    info: {
      id: null,
      role: null,
      isLogged: false,
      exp: null,
    },
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload
    },
    clearInfo: (state) => {
      state.info = {
        id: null,
        role: null,
        isLogged: false,
        exp: null,
      }
    },
  },
})

export const { setInfo, clearInfo } = authSlice.actions

export default authSlice.reducer
