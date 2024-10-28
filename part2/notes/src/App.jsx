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
      .then(res => {
        // console.log(res);
        setNotes(notes.concat(res.data))
      })
    event.target[0].value = ''
  }

  // Funcionalidad para cambiar importancia
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    axios
      .put(`http://localhost:3001/notes/${id}`, changedNote)
        .then(res => {
            console.log(res.data)
            const setUpdatedNotes = notes.map(n => n.id !== id ? n : res.data)
            setNotes(setUpdatedNotes)
        })
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
          <Note key={note.id} note={note} toggleImportance={()=> toggleImportanceOf(note.id)}/>
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
