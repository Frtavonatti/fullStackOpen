import { createSlice } from "@reduxjs/toolkit";

const notificactionSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification (state, action) {
      state = action.payload
      return state
    },
    hideNotification (state, action) {
      return ''
    }
  }
})

export default notificactionSlice.reducer

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout);
  }  
}

export const { showNotification, hideNotification } = notificactionSlice.actions 