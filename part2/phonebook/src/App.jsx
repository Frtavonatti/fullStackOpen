import { useState, useEffect } from 'react'
import Search from '../components/Search'
import Input from '../components/Input'
import Numbers from '../components/Numbers'
import backService from '../services/backend.js'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    const fetchData = () => {
      backService.getAll()
      .then(res => setPersons(res))
    }
    fetchData()
  }, [])

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase()))

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
