import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
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
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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

  // Is connected with addBlog in BlogForm to handle the local states of the form
  const createNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility() // obtained through refs
      const createdBlog = await blogService.create(newBlog)
      createdBlog.user = user
      setBlogs(blogs.concat(createdBlog))
      dispatch(setNotification({ type: 'success', text: 'Blog created succesfully' }))
    } catch (error) {
      dispatch(setNotification({ type: 'error', text: 'Failed to create new blog' }))
    }
  }

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        dispatch(setNotification({ type: 'success', text: 'blog deleted successfully' }))
      } catch (error) {
        dispatch(setNotification({ type: 'error', text: 'Its not possible to delete this blog' }))
      }
    }
  }

  // Is connected with handleLikes in blogform to handle de likes state of the blog
  const updateLikes = async (id, likes) => {
    try {
      const updatedBlog = await blogService.update(id, likes)
      setBlogs(blogs.map(blog => blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog))
    } catch (error) {
      dispatch(setNotification({ type: 'error', text: 'Its not possible to like this blog' }))
    }
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
            <BlogList
              blogs={blogs}
              user={user}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
            />
            <Togglable buttonLabel={'Create new Blog'} ref={blogFormRef}>
              <BlogForm createNewBlog={createNewBlog} />
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