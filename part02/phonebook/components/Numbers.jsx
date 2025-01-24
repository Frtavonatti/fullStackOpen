// import React from "react"
import backServices from '../services/backend'

const Numbers = ({ filteredPersons, persons, setPersons }) => {

    const deletePerson = (id) => {
        const newArrayWithoutId = persons.filter(p => p.id !== id)
        
        if (window.confirm('Do you really want to delete this person?')) {
            backServices.remove(id)
                .then(() => setPersons(newArrayWithoutId))
        }
    }

    return (
        <>
            <h2>Numbers</h2>
            {filteredPersons.map((person, index) => (
                <div key={index}>
                    <li>{person.name} : {person.number}</li>
                    <button onClick={() => deletePerson(person.id)}>Delete</button>
                </div>
            ))}
        </>
    )
}

export default Numbers