import { useDispatch } from "react-redux"
import { addNoteAction } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificacionReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addNoteAction(newAnecdote))
    dispatch(showNotification(`You added ${content}`))
    event.target.anecdote.value = ''
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000);
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm