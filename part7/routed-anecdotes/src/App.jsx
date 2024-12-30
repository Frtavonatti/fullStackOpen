import { useState } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Notification from './components/Notification'
import Footer from './components/Footer'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Added new anecdote: "${anecdote.content}"`)
    setTimeout(() => {
      setNotification(null)
    }, 4000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id)) 
    : null

  // Styles
  const padding = {
    paddingRight: 5
  }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Notification text={notification}/>

      <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">Create</Link>
        <Link style={padding} to="/about">About</Link>
      </div>

      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/create' element={<CreateNew addNew={addNew}/>} />
        <Route path='/about' element={<About/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
