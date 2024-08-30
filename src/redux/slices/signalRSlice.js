import { createSlice } from '@reduxjs/toolkit'

export const signalRSlice = createSlice({
  name: 'signalR',
  initialState: {
    chatHubConnection: null,
    stateHubConnection: null
  },
  reducers: {
    setChatConnection: (state, action) => {
      state.chatHubConnection = action.payload
    },
    setStateConnection: (state, action) => {
      state.stateHubConnection = action.payload
    }
  }
})

export const { setChatConnection, setStateConnection } = signalRSlice.actions

export default signalRSlice.reducer
