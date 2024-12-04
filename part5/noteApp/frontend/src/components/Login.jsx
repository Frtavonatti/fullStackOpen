import Header from "./Header"
const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {

const formContainerStyles = {
  border: '2px solid white',
  borderRadius: '10px',
  padding: '50px'
}

return (
  <div style={formContainerStyles}>
    <Header/>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)
}

export default Login