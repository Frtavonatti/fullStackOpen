import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Footer = (props) => {
  const sumOfExercises = props.parts.reduce((counter, element) => {
    return counter + element.exercises;
  }, 0);  

  const [count, setCount] = useState(sumOfExercises)
  const decreaseByOne = () => setCount(count - 1) 
  const setToZero = () => setCount(0) 
  const increaseByOne = () => setCount(count + 1)
  // console.log('rendering...', count)

  return (
    <div className="card">
      <h3>Total of exercises: {count}</h3>
      <div>
        <Button onClick={decreaseByOne} text={'-'} />
        <Button onClick={setToZero} text={'Set to zero'} />
        <Button onClick={increaseByOne} text={'+'} />
      </div>
    </div>
  )
}

export default Footer;