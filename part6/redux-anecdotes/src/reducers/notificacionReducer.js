import { createSlice } from "@reduxjs/toolkit";

const initialState = 'initial state'

const notificactionSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification (state, action) {
      return state
    }
  }
})

export default notificactionSlice.reducer
export const { showNotification } = notificactionSlice.actions 