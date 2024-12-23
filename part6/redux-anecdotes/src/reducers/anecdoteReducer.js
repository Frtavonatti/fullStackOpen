import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addNoteAction (state, action) {
      state.push(action.payload)
    },
    voteAction (state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { voteAction, addNoteAction, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
