import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Header from './components/Header'
import Note from './components/Note/Note'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // Funcionalidad para renderizar las notas iniciales
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  // Funcionalidad para agregar nuevas notas
  const addNote = (event) => {
    event.preventDefault()
    const query = event.target[0].value
    const newNote = { 
        id: (notes.length + 1).toString(), 
        content: query, 
        important: false 
      }
    noteService
      .create(newNote)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
    event.target[0].value = ''
  }


  // Funcionalidad para cambiar importancia
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
          const setUpdatedNotes = notes.map(n => n.id !== id ? n : returnedNote)
          setNotes(setUpdatedNotes)
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  

  // Funcionalidad para filtrar notas por importancia
  const onlyImportantNotes = notes.filter(note => note.important)

  const handleNotesDisplay = () => {
    setShowAll(!showAll)
  }

  
  // Funcionalidad para mostrar solo notas importantes
  const notesToShow = showAll ? notes : onlyImportantNotes


  // Funcionalidad para eliminar notas
  const deleteNote = (id) => {
    noteService
      .remove(id)
      .then(() => {
        const updatedNotes = notes.filter(n => n.id !== id)
        setNotes(updatedNotes)
      })
  }


  return (
    <>
      <Header/>

      <Notification message={errorMessage} />
        
      <div>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </div>

      <form onSubmit={addNote}>
        <input/>
        <button type="submit">save</button>
      </form>   

      <button onClick={handleNotesDisplay}>Show only important notes</button>
    </>
  )
}

export default App
