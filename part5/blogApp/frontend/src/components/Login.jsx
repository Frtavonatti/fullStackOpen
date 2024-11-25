import PropTypes from 'prop-types'

const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>

      <input
        type="text"
        placeholder='username'
        name="username"
        onChange={(event) => { setUsername(event.target.value) }}
        value={username}
      />
      <input
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

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default Login