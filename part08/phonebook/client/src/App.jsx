import { useQuery, useApolloClient } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_PERSONS } from './querys'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Persons from './components/Person'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const [ token, setToken ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <>
      <Header/>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
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
