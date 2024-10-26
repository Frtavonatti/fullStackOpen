import { useState } from 'react'
import Search from '../components/Search'
import Input from '../components/Input'
import Numbers from '../components/Numbers'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')



  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(newSearch))
  

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h1>Phonebook App</h1>  
        </a>
      </div>

      <Search setNewSearch={setNewSearch} />

      <Input 
        persons={persons}
        setPersons={setPersons}
        newName={newName} 
        newNumber={newNumber} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber}
      />

      <Numbers filteredPersons={filteredPersons}/>
    </>
  )
} 

export default App
