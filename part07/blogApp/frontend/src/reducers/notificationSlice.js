import { createSlice } from '@reduxjs/toolkit'

const initialState = { type: '', text: '' }

const notificactionSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    showNotification (state, action) {
      state = action.payload
      return state
    },
    hideNotification (state, action) {
      return initialState
    }
  }
})

export const setNotification = (content, timeout = 5000) => {
  return async dispatch => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout)
  }
}

export default notificactionSlice.reducer
export const { showNotification, hideNotification } = notificactionSlice.actions