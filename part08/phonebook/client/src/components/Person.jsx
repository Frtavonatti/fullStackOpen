import { gql, useLazyQuery } from "@apollo/client"
import { useState, useEffect } from "react"

const FIND_PERSON = gql`
  query FindPerson($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      id
      name
      phone
      address {
        city
        street
      }
    }
  }
`

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    return (
      <div>
        <h2>Name: {person.name}</h2>
        <div>Adress: {person.address.street}, {person.address.city}</div>
        <div>Phone: {person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>show address</button>
        </div>
      )}
    </div>
  )
}

export default Persons