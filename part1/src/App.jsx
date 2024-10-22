import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


const Header = (props) => {
  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h1>{props.course}</h1>
    </>
  )
}

// Componente para construir las secciones de Content
const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} : {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {  
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Counter = (props) => {
  const sumOfExercises = props.parts.reduce((counter, element) => {
    return counter + element.exercises;
  }, 0);  

  const [count, setCount] = useState(sumOfExercises)

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
      Number of exercises: {count}
      </button>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Counter parts={course.parts}/>
    </>
  )
}

export default App