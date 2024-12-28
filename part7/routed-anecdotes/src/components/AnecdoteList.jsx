import { BrowserRouter as Router,
  Routes, Route, Link 
 } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)

export default AnecdoteList