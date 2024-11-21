const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
    return (      
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

export default Login