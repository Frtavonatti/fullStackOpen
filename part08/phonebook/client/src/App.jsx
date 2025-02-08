import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './querys'
import Header from './components/Header'
import Persons from './components/Person'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { useState } from 'react'

function App() {
  const result = useQuery(ALL_PERSONS)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <>
      <Header/>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </> 
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default App
