import { useState } from 'react'
import reactLogo from './assets/react.svg'

interface Note {
  id: number,
  content: string
}

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'Learning pnpm' }
  ]);

  const generateId = () => Math.round(Math.random() * 100)

  const noteCreation = (event: { preventDefault: () => void; }) => {
    event?.preventDefault()
    setNotes([
      { 
        id: generateId(),
        content: newNote
      },
      ...notes
    ])
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
