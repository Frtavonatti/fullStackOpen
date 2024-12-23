import { useDispatch } from "react-redux"
import { addNoteAction } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificacionReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addNoteAction(content))
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