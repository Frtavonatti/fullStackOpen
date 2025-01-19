import { useState, useEffect } from 'react'
import { getAllNotes, createNote } from './noteService';
import { Note } from './types';
import reactLogo from './assets/react.svg'

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes().then(data => {
      setNotes(data)
    })
  }, [])

  const noteCreation = (event: React.SyntheticEvent ) => {
    event.preventDefault()
    createNote({content: newNote}).then(data => {
        setNotes(notes.concat(data))
    })
    setNewNote('')
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Notes App</h1>
      </div>

      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>add</button>
      </form>

      <div>      
        <ul>{notes.map(note =>
          <li key={note.id}>{note.content}</li>
          )}     
        </ul>
      </div>
    </>
  )
}

export default App
