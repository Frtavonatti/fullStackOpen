import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  textInput: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      state.textInput = action.payload
      return state
    }
  }
})

export default filterSlice.reducer
export const { filterAnecdotes } = filterSlice.actions 
