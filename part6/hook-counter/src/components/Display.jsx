import { useCounterValue } from '../CounterContext'

const Display = () => {
  const counter = useCounterValue() // const [counter] = useContext(CounterContext)

  return(
    <div>Count is: {counter}</div>
  ) 
}

export default Display