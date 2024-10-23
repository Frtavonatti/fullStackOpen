import { useState } from 'react'
import Statistics from '../Components/Statistics'
import Votes from '../Components/Votes'
import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const augmentedGood = good + 1
    setGood(augmentedGood)
    console.log('good:', augmentedGood)
  }

  const handleNeutral = () => {
    const augmentedNeutral = neutral + 1
    setNeutral(augmentedNeutral)
    console.log('neutral:', augmentedNeutral)
  }

  const handleBad = () => {
    const augmentedBad = bad + 1
    setBad(augmentedBad)
    console.log('bad:', augmentedBad)
  }

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>Unicafe</h1> 
      </div>

      <Votes 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        handleGood={handleGood} 
        handleNeutral={handleNeutral} 
        handleBad={handleBad} 
      />
      
      <Statistics good={good} neutral={neutral} bad={bad} />

    </>
  )
}

export default App
