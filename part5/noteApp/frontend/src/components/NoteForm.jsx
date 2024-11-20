import Note from "./Note/Note"

const NoteForm = ({ addNote, notesToShow, handleNotesDisplay, toggleImportance, deleteNote } ) => {
    return (
        <>
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

            <form onSubmit={addNote}>
                <input />
                <button type="submit">save</button>
            </form>   

            <button onClick={handleNotesDisplay}>Show only important notes</button>
        </>
    )
}

export default NoteForm