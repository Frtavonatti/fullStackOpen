import { useContext, useReducer } from 'react'
import CounterContext from './CounterContext'
import './App.css'

const Display = () => {
  const [counter] = useContext(CounterContext)
  return <div>Count is: {counter}</div>
}

const Button = ({ type, label }) => {
  const [counter, counterDispatch] = useContext(CounterContext)
  return (
    <button onClick={() => counterDispatch({ type })}>
      {label}
    </button>
  )
}

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
        return state + 1
    case "DEC":
        return state - 1
    case "ZERO":
        return 0
    default:
        return state
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}> 
      <h1>Hook Counter</h1>
      <Display counter={counter}/>
      <div>
        <Button dispatch={counterDispatch} type='DEC' label='-' />
        <Button dispatch={counterDispatch} type='INC' label='+' /><br/>
        <Button dispatch={counterDispatch} type='ZERO' label='0' />
      </div>
    </CounterContext.Provider> 

  )
}

export default App