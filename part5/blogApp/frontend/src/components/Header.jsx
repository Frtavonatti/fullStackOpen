import reactLogo from '../assets/react.svg'

const Header = ({ user, handleLogout }) => {
  const username = user ? user.username : 'default' //revisar el comportamiento y entender porque no me permite trabajar directamente con user.username

  return (
    <div>
      {user && (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <h4>Logged in: {username}</h4>
          <button
            style={{ marginLeft: '2rem' }}
            onClick={handleLogout}
          >
                        Logout
          </button>
        </div>
      )}

      <h1>Blogs</h1>
      <a href="https://react.dev" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  )
}

export default Header