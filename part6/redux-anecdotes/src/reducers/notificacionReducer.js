import { createSlice } from "@reduxjs/toolkit";

const initialState = ''
const notificactionSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification (state, action) {
      state = action.payload
      return state
    },
    hideNotification (state, action) {
      state = initialState
      return state
    }
  }
})

export default notificactionSlice.reducer
export const { showNotification, hideNotification } = notificactionSlice.actions 