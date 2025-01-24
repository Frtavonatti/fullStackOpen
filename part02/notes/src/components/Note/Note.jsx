import './styles.css'

const Note = ({ note, toggleImportance, deleteNote }) => {
    const label = note.important
      ? 'make not important' : 'make important'
  
    return (
      <div className="note">
        <p>{note.content}</p>
        <br></br>

        <div className="buttonContainer">
          <button className="togleButton" onClick={toggleImportance}>{label}</button>
          <button className="deleteButton" onClick={deleteNote}>Delete</button>
        </div>
      </div>
    )
  }

export default Note