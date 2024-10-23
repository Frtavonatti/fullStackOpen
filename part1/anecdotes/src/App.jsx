import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

function App() {
  const initialLikes = Array(anecdotes.length).fill(0)
  const [likes, setLikes] = useState(initialLikes)
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const upVote = () => {
    const newLikes = [...likes];
    newLikes[selected]++
    setLikes(newLikes)
  }

  const mostLiked = likes.indexOf(Math.max(...likes))

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>Anecdotes</h1>
      </div>

      <div className="anecdote">
        <h3>Anecdote of the day:</h3>
        <p>{anecdotes[selected]}</p>
        <button onClick={nextAnecdote}>Next</button>
        <button onClick={upVote}>👍</button>
        <p>Likes: {likes[selected]}</p>
      </div>

      <div className="anecdote">
        <h1>--------------------</h1>
        <h3>Anecdote with most likes:</h3>
        <p>{anecdotes[mostLiked]}</p>
        <p>Has {likes[mostLiked]} likes</p>
        <p>The likes array is: {likes.join(', ')} </p>
      </div>  
    </>
  )
}

export default App
