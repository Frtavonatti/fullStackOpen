import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsSlice'
import Login from './components/Login'
import Header from './components/Header'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const unformattedUser = window.localStorage.getItem('loggedUser')
    if (unformattedUser) {
      const JSONuser = JSON.parse(unformattedUser)
      blogService.setToken(JSONuser.token)
      setUser(JSONuser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <>
      <Header
        user={user}
        handleLogout={handleLogout}
      />

      { message.text && <Notification message={message}/> }

      {
        user
          ?
          <div>
            <BlogList user={user}/>
            <Togglable buttonLabel={'Create new Blog'} ref={blogFormRef}>
              <BlogForm />
            </Togglable>
          </div>

          : <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
      }
    </>
  )
}

export default App