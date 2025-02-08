import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS, CREATE_PERSON } from '../querys'

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const resetForm = () => {
    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onCompleted: () => {
      resetForm()
      // setError('Person created successfully!')
      setTimeout(() => setError(null), 5000)
    },
    onError: (error) => {
      setError(error.graphQLErrors[0]?.message || 'Error creating person')
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!name.trim() || !street.trim() || !city.trim()) {
      setError('Name, street and city are required')
      return
    }

    try {
      await createPerson({
        variables: {
          name: name.trim(),
          phone: phone.trim(),
          street: street.trim(),
          city: city.trim()
        }
      })
    } catch (error) {
      console.error(error);
      setError('Error creating person')
    }
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={submit}>
        <div>
          name * <input 
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
        </div>
        <div>
          phone <input 
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street * <input 
            value={street}
            onChange={({ target }) => setStreet(target.value)}
            required
          />
        </div>
        <div>
          city * <input 
            value={city}
            onChange={({ target }) => setCity(target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default PersonForm