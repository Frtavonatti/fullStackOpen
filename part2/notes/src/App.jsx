import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App({ notes }) {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Note App</h1>
        <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
      </div>
    </>
  )
}

export default App
