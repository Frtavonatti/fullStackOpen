import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const noteSlice = createSlice({ 
  name: 'notes', 
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    },
    appendNotes(state, action) {
      state.push(action.payload)
    },
    setNotes(state,action) {
      return action.payload
    }
  }
})

export const { toggleImportanceOf, appendNotes, setNotes } = noteSlice.actions

// Redux thunk permite implementar action creators que devuelven una función en lugar de un objeto. 
// esto permite implmentar action creators asíncronos, que esperan la finalización de una operación y luego despachan una acción.
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNotes(newNote))
  }
}

export default noteSlice.reducer
