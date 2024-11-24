import { createSlice } from '@reduxjs/toolkit'

const pageSectionInitState = {
  type: null,
  isActive: false,
  data: {
    id: null
  }
}

export const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    pageSection: pageSectionInitState
  },
  reducers: {
    set: (state, action) => {
      state.pageSection = action.payload
    },
    clear: (state) => {
      state.pageSection = pageSectionInitState
    },
    close: (state) => {
      state.pageSection = {
        ...state.pageSection,
        isActive: false
      }
    }
  }
})

export const { set, clear, close } = sectionSlice.actions

export default sectionSlice.reducer
