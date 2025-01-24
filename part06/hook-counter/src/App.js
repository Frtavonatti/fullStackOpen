import { useContext } from 'react'
import CounterContext from './CounterContext'
import Display from './components/Display'
import Button from './components/Button'
import './App.css'

const App = () => {
  const [counter, counterDispatch] = useContext(CounterContext)

  return (
    <> 
      <h1>Hook Counter</h1>
      <Display counter={counter}/>
      <div>
        <Button dispatch={counterDispatch} type='DEC' label='-' />
        <Button dispatch={counterDispatch} type='INC' label='+' /><br/>
        <Button dispatch={counterDispatch} type='ZERO' label='0' />
      </div>
    </> 

  )
}

export default App