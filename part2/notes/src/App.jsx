import { useState } from 'react'
import Note from './components/Note'
import reactLogo from './assets/react.svg'
import './App.css'

function App(props) {
  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {
    event.preventDefault()
    const query = event.target[0].value
    const newNote = { 
        id: notes.length + 1, 
        content: query, 
        important: false 
      } 
    setNotes(notes.concat(newNote))
  }
  
  console.log(notes);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Note App</h1>
      </div>
        
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input/>
        <button type="submit">save</button>
      </form>   
    </>
  )
}

export default App
