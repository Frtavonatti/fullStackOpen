import { useSelector, useDispatch } from 'react-redux'
import './App.css'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  // Actions
  const voteAction = (id) => {
    return {
      type: 'VOTE',
      payload: { id } 
    }
  }

  // Action creators
  const vote = (id) => {
    dispatch(voteAction(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App