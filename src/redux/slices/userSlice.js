import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: {
    login: null,
    email: null,
    role: null,
    birthday: null,
    image: null
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: initialState.info
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
      state.info = initialState.info
    }
  }
})

export const { updateInfo, setInfo, clearInfo } = userSlice.actions

export default userSlice.reducer
