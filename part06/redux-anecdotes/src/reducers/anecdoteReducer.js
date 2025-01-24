import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    },
    updateVotes (state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    }
  }
})

export const { updateVotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  // Puedes acceder al estado actual del store utilizando el segundo parámetro de la función despachadora.
  return async (dispatch, getState) => { 
    const { anecdotes } = getState()
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1 
    }
    const updatedAnecdote = await anecdoteService.updateOne(changedAnecdote)
    dispatch(updateVotes(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
