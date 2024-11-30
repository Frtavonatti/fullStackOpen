import { useState } from "react"

import Note from "./Note/Note"
import Header from "./Header"
import Togglable from './Togglable'

const NoteForm = ({ notes, user, addNote, toggleImportance, deleteNote, handleLogout } ) => {
    const [showAll, setShowAll] = useState(true)
    
    // Funcionalidad para filtrar notas por importancia
    const onlyImportantNotes = notes.filter(note => note.important)
    const handleNotesDisplay = () => {
        setShowAll(!showAll)
    }

    // Solo mostrar notas importantes
    const notesToShow = showAll ? notes : onlyImportantNotes
    
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

            <Togglable buttonLabel={'Create new Note'}>
                <form onSubmit={addNote}>
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