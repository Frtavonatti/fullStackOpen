
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'

import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import reactLogo from './assets/react.svg'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>Notes Redux</h1>
      <Notes />
      <VisibilityFilter />
      <NewNote />
    </>
  )
}

export default App
