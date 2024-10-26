// import React from "react"

const Numbers = ({ filteredPersons }) => {
    return (
        <>
            <h2>Numbers</h2>
            {filteredPersons.map((person, index) => (
            <li key={index}>{person.name} : {person.number}</li>
            ))}
        </>
    )
}

export default Numbers