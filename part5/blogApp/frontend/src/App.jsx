import { useState, useEffect } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // States for BlogList
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const unformattedUser = window.localStorage.getItem('loggedUser')
    if (unformattedUser) {
      const JSONuser = JSON.parse(unformattedUser)
      setUser(JSONuser)
    }
  }, []);


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
    }
  }

  const handleLogout = (event) => {
    event.preventDefault
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: link
      }
      
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setLink('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header 
        user={user}
        handleLogout={handleLogout}
      />

      {
        user 
          ? <BlogList 
            blogs={blogs}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            link={link}
            setLink={setLink}
            createNewBlog={createNewBlog}
          />
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