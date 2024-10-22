import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Header = (props) => {
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
    {/* TO-DO: Refactorizar para que cada parrafo sea un componente
      <Part/>
      <Part/>
      <Part/> */}

      <p>
        {props.parts[0]} {props.exercises[0]}
      </p>
      <p>
      {props.parts[1]} {props.exercises[1]}
      </p>
      <p>
        {props.parts[2]} {props.exercises[2]}
      </p>
    </>
  )
}

const Counter = (props) => {
  const [count, setCount] = useState(props.number)

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
      Number of exercises: {count}
      </button>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>

      <Header course={course}/>

      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>

      <Counter number={exercises1 + exercises2 + exercises3}/>

    </>
  )
}

export default App