import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsSlice'
import { initializeUser } from './reducers/usersSlice'
import Login from './components/Login'
import Header from './components/Header'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <>
      <Header user={user} />
      {message.text && <Notification message={message} />}

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
    </>
  )
}

export default App