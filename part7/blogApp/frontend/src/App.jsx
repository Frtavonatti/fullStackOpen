import axios from "axios";
import { Routes, Route, useMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsSlice'
import { initializeUser } from './reducers/usersSlice'
import BlogsPage from './components/BlogsPage'
import Header from './components/Header'
import UsersPage from './components/UsersPage'
import UserCard from './components/UserCard'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    axios.get('/api/users').then(response => {
      setUsers(response.data)
    })
  }, [])

  const match = useMatch('/users/:id')
  const userMatched = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <>
      <Header user={user} />
      {message.text && <Notification message={message} />}

      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/users" element={<UsersPage users={users} />} />
        <Route path="/users/:id" element={<UserCard user={userMatched} />} />
      </Routes>
    </>
  )
}

export default App