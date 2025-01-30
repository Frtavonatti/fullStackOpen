import { gql, useQuery } from '@apollo/client'
import Persons from './components/Person'
import reactLogo from './assets/react.svg'

const ALL_PERSONS = gql`
  query {
    allPersons  {
      name
      phone
      id
    }
  }
`

function App() {
  const result = useQuery(ALL_PERSONS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>Phonebook</h1>

      <Persons persons={result.data.allPersons}/>
    </>
  )
}

export default App
