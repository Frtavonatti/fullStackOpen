import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from "../reducers/notificacionReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id, content, votes) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`You voted "${content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
  }

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter.textInput === '') {
      return anecdotes
    }

    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.textInput.toLowerCase()))
  })
  

  return (
    <div>
      {[...anecdotes] // cuando uses Redux Toolkit para devolver el estado inicial de las anécdotas, será inmutable, por lo que tendrás que copiarlo para ordenarlas
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList