import axios from "axios";
import { Routes, Route, useMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsSlice'
import { initializeUser } from './reducers/usersSlice'
import BlogsListPage from './pages/BlogsListPage'
import BlogDetailPage from './pages/BlogDetailPage'
import UsersListPage from './pages/UsersListPage'
import UserDetailPage from './pages/UserDetailPage'
import Header from './components/Header'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  // TO-DO: Refactor this to use Redux instead of local state for users
  useEffect(() => {
    axios.get('/api/users').then(response => {
      setUsers(response.data)
    })
  }, [])

  const userMatch = useMatch('/users/:id')
  const userMatched = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  return (
    <>
      <Header />
      {message.text && <Notification message={message} />}

      <Routes>
        <Route path="/" element={<BlogsListPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/users" element={<UsersListPage users={users} />} />
        <Route path="/users/:id" element={<UserDetailPage user={userMatched} />} />
      </Routes>
    </>
  )
}

export default App