import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h1>Phonebook App</h1>  
        </a>
      </div>
      
      <div>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      ...
    </div>

    </>
  )
} 

export default App
