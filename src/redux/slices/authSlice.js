import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    info: {
      id: null,
      role: null,
      isLogged: false,
      accessTokenExp: null,
      refreshTokenExp: null
    }
  },
  reducers: {
    updateInfo: (state, action) => {
      state.info = {
        ...state.info,
        ...action.payload
      }
    },
    setInfo: (state, action) => {
      state.info = action.payload
    },
    clearInfo: (state) => {
      state.info = {
        id: null,
        role: null,
        isLogged: false,
        accessTokenExp: null,
        refreshTokenExp: null
      }
    }
  }
})

export const { setInfo, clearInfo, updateInfo } = authSlice.actions

export default authSlice.reducer
