import { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  // Funcionalidad para renderizar las notas iniciales
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // Funcionalidad para revisar si el navegador ya cuenta con un token autenticado
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // Funcionalidad para agregar nuevas notas
  const addNote = (newNote) => {
    noteService
      .create(newNote)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  // Funcionalidad para cambiar importancia
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
          const setUpdatedNotes = notes.map(n => n.id !== id ? n : returnedNote)
          setNotes(setUpdatedNotes)
      })
      .catch((error) => {
        console.error('toggle importance failed:', error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  
  // Funcionalidad para eliminar notas
  const deleteNote = (id) => {
    noteService
      .remove(id)
      .then(() => {
        const updatedNotes = notes.filter(n => n.id !== id)
        setNotes(updatedNotes)
      })
  }

  // Funcionalidad para manejar el login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 

      noteService.setToken(user.token)
      setUser(user)

      setPassword('')
      setUsername('')
    } catch (error) {
      console.error('Login failed:', error)
      setErrorMessage('invalid usr or psw')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      window.localStorage.removeItem('loggedNoteappUser')
    }
    setUser(null)
  }

  return (
    <>
      <Notification message={errorMessage} />

      {user === null
        ? <Login 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          /> 
        : <NoteForm 
          notes={notes}
          addNote={addNote}
          toggleImportance={toggleImportanceOf}
          deleteNote={deleteNote}
          user={user}
          handleLogout={handleLogout}
          />
        }
    </>
  )
}

export default App
