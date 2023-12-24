import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    info: {
      id: null,
      role: null,
      isLogged: false,
      accessTokenExp: null,
      refreshTokenExp: null,
    },
  },
  reducers: {
    setInfo: (state, action) => {
      console.log(action.payload);
      state.info = action.payload
    },
    clearInfo: (state) => {
      state.info = {
        id: null,
        role: null,
        isLogged: false,
        accessTokenExp: null,
        refreshTokenExp: null,
      }
    },
  },
})

export const { setInfo, clearInfo } = authSlice.actions

export default authSlice.reducer
