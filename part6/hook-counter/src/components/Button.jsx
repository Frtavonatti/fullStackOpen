import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch() // const [counter, dispatch] = useContext(CounterContext)
  
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

export default Button