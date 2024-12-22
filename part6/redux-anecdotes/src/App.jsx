import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import './App.css'

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </>
  )
}

export default App