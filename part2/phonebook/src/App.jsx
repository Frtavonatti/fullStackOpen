import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '',
     }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      setNewName('') && setNewNumber('')
    }
  }


  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h1>Phonebook App</h1>  
        </a>
      </div>
      
      <div>
      <form onSubmit={handleSubmit}> 
        <div>name: <input value={newName} onChange={handleNameInput}/></div>
        <div>number: <input value={newNumber} onChange={handlePhoneInput}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <li key={index}>{person.name} : {person.number}</li>
        ))}
    </div>

    </>
  )
} 

export default App
