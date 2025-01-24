import reactLogo from '../assets/react.svg'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/usersSlice'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const username = user ? user.username : 'default' //revisar el comportamiento y entender porque no me permite trabajar directamente con user.username

  const handleLogout = (event) => {
    event.preventDefault
    dispatch(logoutUser())
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <nav>
        <Link style={{'padding': '1rem'}} to="/">Blogs</Link>
        <Link style={{'padding': '1rem'}} to="/users">Users</Link>
      </nav>
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
      </div>

      <div display="flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>BlogApp</h1>
      </div>
    </div>
  )
}

export default Header