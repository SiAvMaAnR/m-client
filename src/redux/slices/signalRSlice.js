import { createSlice } from '@reduxjs/toolkit'

export const signalRSlice = createSlice({
  name: 'signalR',
  initialState: {
    chatHub: null,
    stateHub: null
  },
  reducers: {
    setChatHub: (state, action) => {
      state.chatHub = action.payload
    },
    setStateHub: (state, action) => {
      state.stateHub = action.payload
    }
  }
})

export const { setChatHub, setStateHub } = signalRSlice.actions

export default signalRSlice.reducer
