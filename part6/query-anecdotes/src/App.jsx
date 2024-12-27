import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateVotes } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useReducer } from 'react'
import './App.css'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    default:
      return ''
  }
}

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  
  // Mutation Handlers
  const newVotesMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  // Event Handlers
  const handleVote = (anecdote) => {
    newVotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1  })
  }

  const result = useQuery({    
    queryKey: ['anecdotes'], //queryKey sirve como referencia posterior (puedes nombrarla como quieras)
    queryFn: getAll,
    retry: false  
  })
  
  // console.log(JSON.parse(JSON.stringify(result)))

  if (result.isError) {
    return (
    <div>
      <h3> Anecdote service is not available due to problems in server </h3>
      <span> Error: {result.error.message}</span>
    </div>)
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>  
  }

  const anecdotes = result.data

  return (
    <div>
      <h1>Anecdote app</h1>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
