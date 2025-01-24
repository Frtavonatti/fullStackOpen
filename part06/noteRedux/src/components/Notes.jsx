import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = () => {
    const dispatch = useDispatch() 
    const notes = useSelector(({ notes, filter }) => {
      if(filter === 'ALL') {
        return notes
      } 
      return filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important) 
    })

  const toggleImportance = (id) => {    
    dispatch(toggleImportanceOf(id))  
  }

  return (
    <ul>
      {notes.map(note=>
        <div key={note.id}>
          <li>
            {note.content}
          </li>
          <button onClick={e => toggleImportance(note.id)}>
            {note.important ? 'important' : 'make important'}
          </button>
        </div>
      )}
    </ul>
  )
}

export default Notes