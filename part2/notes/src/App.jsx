import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import reactLogo from './assets/react.svg'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  // La función useEffect toma dos parámetros:
  // El primero es una función, el efecto en sí mismo.
  // El segundo parámetro de useEffect se usa para especificar la frecuencia con la que se ejecuta el efecto. 
  // Si el segundo parámetro es una matriz vacía [], entonces el efecto solo se ejecuta junto con el primer renderizado del componente.
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
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Note App</h1>
      </div>
        
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input/>
        <button type="submit">save</button>
      </form>   

      <button onClick={handleNotesDisplay}>Show only important notes</button>
    </>
  )
}

export default App
