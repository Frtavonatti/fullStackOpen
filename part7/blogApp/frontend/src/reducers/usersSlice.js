import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {}

const usersSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser (state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = usersSlice.actions

// Thunks
export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export default usersSlice.reducer