import backService from '../services/backend'

const Input = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {
    const handleNameInput = (event) => {
        setNewName(event.target.value)
      }
    
      const handlePhoneInput = (event) => {
        setNewNumber(event.target.value)
      }

      const handleSubmit = (event) => {
        event.preventDefault()
        const isPersonMatched = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
        const personMatched = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

        if (isPersonMatched) {
          window.confirm(`${newName} is already added to phonebook, do you want to update his/her information?`)
          ? backService
            .update(personMatched.id, {name: newName, number: newNumber})
            .then(res => {
              setPersons(persons.map(person => person !== personMatched ? person : res))
            })
          : alert('No changes applied');
      

        } else if (newName.length < 3 || newNumber.length < 3) {
          alert('The name and number must each be at least 3 characters long. Please provide valid inputs.')

        } else {
          const addedPerson = {name: newName, number: newNumber, id: (persons.length + 1).toString()}

          backService.create(addedPerson)
            .then(res => {           
              setPersons([...persons, res])
              setNewName('') 
              setNewNumber('')
            })
        }
      }

    return (
        <>
            <h2>Add a new person</h2>

            <form onSubmit={handleSubmit}> 
              <div>
                  name: 
                  <input 
                    value={newName} 
                    onChange={handleNameInput}
                  />
              </div>

              <div>
                  number: 
                  <input 
                    value={newNumber} 
                    onChange={handlePhoneInput}
                  />
              </div>
              
              <div>
                <button type="submit">add</button>
              </div>
            </form>
      </>
    )
}

export default Input