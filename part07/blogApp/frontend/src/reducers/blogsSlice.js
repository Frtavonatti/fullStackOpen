import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    addBlog (state, action) {
      state.push(action.payload)
    },
    removeBlog (state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    updateBlog (state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },
    setBlogs (state, action) {
      return action.payload
    }
  }
})

export const { addBlog, removeBlog, updateBlog, setBlogs } = blogsSlice.actions

// Thunks
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (id, likes) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, likes)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogsSlice.reducer