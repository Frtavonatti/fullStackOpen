import { useState, useEffect } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

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
      blogService.setToken(JSONuser.token)
    }
  }, []);

  // Effect to automatically clear notifications after 5 seconds
  useEffect(() => {
    if (message.text) {
        setTimeout(() => {
            setMessage({ type: '', text: '' });
        }, 5000)
    }
  }, [message])

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
      setMessage(error)
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
      setMessage({type: 'success', text: 'Blog created succesfully'})
      setTitle('')
      setAuthor('')
      setLink('')
    } catch (error) {
      setMessage({type: 'error', text: 'Failed to create new blog'})
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setMessage({ type: 'success', text: 'blog deleted successfully' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Its not possible to delete this blog' })
    }
  }

  return (
    <>
      <Header 
        user={user}
        handleLogout={handleLogout}
      />

      { message.text && <Notification message={message}/>}

      {
        user 
          ? 
          <div>
            <BlogList 
            blogs={blogs}
            deleteBlog={deleteBlog}
            />
            <BlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            link={link}
            setLink={setLink}
            createNewBlog={createNewBlog}
            />
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