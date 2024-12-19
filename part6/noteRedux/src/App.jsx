import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/newNote'
import Notes from './components/Notes'
import reactLogo from './assets/react.svg'
import './App.css'

const App = () => {
  // useDispatch proporciona acceso a cualquier componente de React a la función dispatch de redux-store definida en main.jsx
  const dispatch = useDispatch() //Antes usabamos dispatch de redux-store, ahora usamos el hook useDispatch de React
  
  // useSelector nos permite acceder a las notas almacenadas en el store
  const notes = useSelector(state => state)

  useEffect(() => {
    if (notes.length === 0) {
      dispatch({
        type: 'NEW_NOTE',
        payload: {
          content: 'the app state is in redux store',
          important: true,
          id: 1
        }
      })
      
      dispatch({
        type: 'NEW_NOTE',
        payload: {
          content: 'state changes are made with actions',
          important: false,
          id: 2
        }
      })
    }
  }, [notes])
  
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Notes Redux</h1>
      <Notes/>
      <NewNote/>
    </>
  )
}

export default App
