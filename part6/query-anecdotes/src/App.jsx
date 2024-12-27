import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const queryClient = useQueryClient()
  // Mutation Handlers

  // Event Handlers
  const handleVote = (anecdote) => {
    console.log(`voted ${anecdote.content}`)
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
