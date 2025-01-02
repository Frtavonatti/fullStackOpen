import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/usersSlice'
import { setNotification } from '../reducers/notificationSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error))
    }
  }
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: '0 auto'
  }

  return (
    <form style={formStyle}>
      <input
        data-testid='username'
        type="text"
        placeholder='username'
        name="username"
        onChange={(event) => { setUsername(event.target.value) }}
        value={username}
      />
      <input
        data-testid='password'
        type="password"
        placeholder='password'
        name="password"
        onChange={(event) => { setPassword(event.target.value) }}
        value={password}
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  )
}

export default Login