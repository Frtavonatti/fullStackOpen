import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import reactLogo from './assets/react.svg'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  // la función useEffect toma dos parámetros:
  // El primero es una función, el efecto en sí mismo.
  // El segundo parámetro de useEffect se usa para especificar la frecuencia con la que se ejecuta el efecto. 
  // Si el segundo parámetro es una matriz vacía [], entonces el efecto solo se ejecuta junto con el primer renderizado del componente.
  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
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
    axios
      .post('http://localhost:3001/notes', newNote) 
      .then(setNotes(notes.concat(newNote)))
    event.target[0].value = ''
  }
  
  // Funcionalidad para filtrar notas por importancia
  const onlyImportantNotes = notes.filter(note => note.important)

  const handleNotesDisplay = () => {
    setShowAll(!showAll)
  }

  const notesToShow = showAll ? notes : onlyImportantNotes

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
          <Note key={note.id} note={note} />
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
