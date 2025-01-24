import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Search from '../components/Search'
import Input from '../components/Input'
import Numbers from '../components/Numbers'
import Notification from '../components/Notification'
import backService from '../services/backend.js'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    backService
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <>
      <Header/>

      <Notification message={message}/>

      <Search setNewSearch={setNewSearch} />

      <Input 
        persons={persons}
        setPersons={setPersons}
        newName={newName} 
        newNumber={newNumber} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber}
        setMessage={setMessage}
      />

      <Numbers 
        filteredPersons={filteredPersons}
        persons={persons}
        setPersons={setPersons}
      />
    </>
  )
} 

export default App
