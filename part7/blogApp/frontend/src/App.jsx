import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsSlice'
import { initializeUser } from './reducers/usersSlice'
import Login from './components/Login'
import Header from './components/Header'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm/BlogForm'
import Users from './components/Users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

const BlogsPage = () => {
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

  return (
    <div>
      {user ? (
        <div>
          <BlogList user={user} />
          <Togglable buttonLabel={'Create new Blog'} ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <Router>
      <div>
        <Link style={{'padding': '1rem'}} to="/">Blogs</Link>
        <Link style={{'padding': '1rem'}} to="/users">Users</Link>
      </div>

      <Header user={user} />
      {message.text && <Notification message={message} />}

      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/users" element={<Users />} />
      </Routes>

    </Router>
  )
}

export default App