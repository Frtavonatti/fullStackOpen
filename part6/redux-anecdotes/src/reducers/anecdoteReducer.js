import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    addNoteAction (state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    },

    voteAction (state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    }
  }
})

export default anecdoteSlice.reducer
export const { voteAction, addNoteAction } = anecdoteSlice.actions

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'CREATE':
//       return state.concat(action.payload)

//     case 'VOTE':
//       const id = action.payload.id 
//       const updatedAnecdotes = state.map(anecdote => 
//         anecdote.id !== id 
//           ? anecdote 
//           : {...anecdote, votes: anecdote.votes + 1})
//       return updatedAnecdotes

//     default:
//       return state
//   }
// }

// export const voteAction = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id } 
//   }
// }

// export const addNoteAction = (content) => {
//   return {
//     type: 'CREATE',
//     payload: { 
//       content: content,
//       id: () => (100000 * Math.random()).toFixed(0),
//       votes: 0
//     }
//   }
// }
