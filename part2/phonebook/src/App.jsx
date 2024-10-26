import { useState } from 'react'
import Search from '../components/Search'
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

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`); 
    } else if (newName === "" || newNumber === "") {
      console.log('You should input a name')
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('') 
      setNewNumber('')
    }
  }

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

      <div>
        <h2>Add a new Person</h2>
        <form onSubmit={handleSubmit}> 
          <div>name: <input value={newName} onChange={handleNameInput}/></div>
          <div>number: <input value={newNumber} onChange={handlePhoneInput}/></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>

      <Numbers filteredPersons={filteredPersons}/>
    </>
  )
} 

export default App
