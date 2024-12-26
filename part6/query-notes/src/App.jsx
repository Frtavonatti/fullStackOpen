import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'
import './App.css'

const App = () => {
  const queryClient = useQueryClient()

  // Mutation handlers
  const newNoteMutation = useMutation({ 
    mutationFn: createNote, 
    onSuccess: (newNote) => {      
      // queryClient.invalidateQueries({ queryKey: ['notes'] })
      const notes = queryClient.getQueryData(['notes'])      
      queryClient.setQueryData(['notes'], notes.concat(newNote))
      },
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  // Event Handlers
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false // la funcionalidad predeterminada de las queries de React Query es que estas (cuyo estado es stale) se actualicen con el evento window focus, es decir, cuando cambia el elemento activo de la interfaz de usuario de la aplicación.
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <button> {note.important ? 'important' : 'make important'}</button>
        </li>
      )}
    </div>
  )
}

export default App