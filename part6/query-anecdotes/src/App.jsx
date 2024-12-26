import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import './App.css'

const App = () => {
  const result = useQuery({    
    queryKey: ['anecdotes'], //queryKey sirve como referencia posterior (puedes nombrarla como quieras)
    queryFn: () => axios.get('http://localhost:3001/anecdotes')
      .then(res => res.data),
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

  const handleVote = (anecdote) => {
    console.log(`voted ${anecdote.content}`)
  }

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
