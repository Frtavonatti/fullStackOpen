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
const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} : {part.exercises}
      </p>
    </>
  )
}

const Content = ({ parts }) => {  
  return (
    <>
      <Part part={parts[1]} />
      <Part part={parts[2]} />
      <Part part={parts[0]} />
    </>
  )
}

// Componentes para la sección Footer
const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Footer = (props) => {
  const sumOfExercises = props.parts.reduce((counter, element) => {
    return counter + element.exercises;
  }, 0);  

  const [count, setCount] = useState(sumOfExercises)
  const decreaseByOne = () => setCount(count - 1) 
  const setToZero = () => setCount(0) 
  const increaseByOne = () => setCount(count + 1)
  console.log('rendering...', count)

  return (
    <div className="card">
      <h3>Number of exercises:{count}</h3>
      <div>
        <Button onClick={decreaseByOne} text={'-'} />
        <Button onClick={setToZero} text={'Set to zero'} />
        <Button onClick={increaseByOne} text={'+'} />
      </div>
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
      <Footer parts={course.parts}/>
    </>
  )
}

export default App