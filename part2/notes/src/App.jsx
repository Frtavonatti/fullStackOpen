import { useState } from 'react'
import Note from './components/Note'
import reactLogo from './assets/react.svg'
import './App.css'

function App({ notes }) {
  // console.log(notes)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Note App</h1>
        
        <ul>
          {notes.map(note => 
            <Note key={note.id} note={note} />
          )}
        </ul>
      </div>
    </>
  )
}

export default App
