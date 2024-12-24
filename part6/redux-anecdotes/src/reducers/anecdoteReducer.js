import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { voteAction, addNoteAction, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
