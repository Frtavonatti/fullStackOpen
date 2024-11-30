import { useState, useRef } from "react"

import Note from "./Note/Note"
import Header from "./Header"
import Togglable from './Togglable'

const NoteForm = ({ notes, user, addNote, toggleImportance, deleteNote, handleLogout } ) => {
    const [showAll, setShowAll] = useState(true)
    const newNoteForm = useRef()
    
    // Funcionalidad para filtrar notas por importancia
    const onlyImportantNotes = notes.filter(note => note.important)
    const handleNotesDisplay = () => {
        setShowAll(!showAll)
    }
    // Solo mostrar notas importantes
    const notesToShow = showAll ? notes : onlyImportantNotes

    // Funcionalidad para agregar nuevas notas
    const createNote = (event) => {
        event.preventDefault() 

        newNoteForm.current.toggleVisibility()
        const query = event.target[0].value
        const newNote = { 
            id: (notes.length + 1).toString(), 
            content: query, 
            important: false 
        }
        addNote(newNote)        
        event.target[0].value = ''
    }
    
    return (
        <>
            <Header user={user} handleLogout={handleLogout} />
            <div>
                {notesToShow.map(note => 
                    <Note 
                        key={note.id} 
                        note={note} 
                        toggleImportance={() => toggleImportance(note.id)}
                        deleteNote={() => deleteNote(note.id)}
                    />
                )}
            </div>

            <Togglable buttonLabel={'Create new Note'} ref={newNoteForm}>
                <form onSubmit={createNote}>
                    <input />
                    <button type="submit">save</button>
                </form>   
            </Togglable>


            <button onClick={handleNotesDisplay}
                style={{marginTop: '15px'}}
            >
                Show only important notes
            </button>
        </>
    )
}

export default NoteForm