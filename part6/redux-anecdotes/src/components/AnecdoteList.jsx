import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList