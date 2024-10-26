const Input = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {
    const handleNameInput = (event) => {
        setNewName(event.target.value)
      }
    
      const handlePhoneInput = (event) => {
        setNewNumber(event.target.value)
      }

      const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
          console.log(`${newName} is already added to phonebook`); 
        } else if (newName === "" || newNumber === "") {
          console.log('You should input a name')
        } else {
          setPersons(persons.concat({name: newName, number: newNumber}))
          setNewName('') 
          setNewNumber('')
        }
      }

    return (
        <>
            <h2>Add a new Person</h2>
            <form onSubmit={handleSubmit}> 
            <div>name: <input value={newName} onChange={handleNameInput}/></div>
            <div>number: <input value={newNumber} onChange={handlePhoneInput}/></div>
            <div><button type="submit">add</button></div>
            </form>
      </>
    )
}

export default Input