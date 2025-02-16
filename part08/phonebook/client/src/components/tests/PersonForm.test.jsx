import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import PersonForm from '../PersonForm'
import { CREATE_PERSON, ALL_PERSONS } from '../../querys'
import { describe, it, expect, vi } from 'vitest'

const mocks = [
  {
    request: {
      query: CREATE_PERSON,
      variables: { name: 'Jane Doe', phone: '987654321', street: 'Main St', city: 'Hometown' },
    },
    result: {
      data: {
        createPerson: {
          name: 'Jane Doe',
          phone: '987654321',
          street: 'Main St',
          city: 'Hometown',
          __typename: 'Person'
        },
      },
    },
  },
  {
    request: {
      query: ALL_PERSONS,
    },
    result: {
      data: {
        allPersons: [],
      },
    },
  },
]

describe('PersonForm', () => {
  it('renders and submits form', async () => {
    const setError = vi.fn()
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PersonForm setError={setError} />
      </MockedProvider>
    )

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByPlaceholderText(/phone/i), { target: { value: '987654321' } })
    fireEvent.change(screen.getByPlaceholderText(/street/i), { target: { value: 'Main St' } })
    fireEvent.change(screen.getByPlaceholderText(/city/i), { target: { value: 'Hometown' } })
    fireEvent.click(screen.getByText(/add/i))


    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText(/name/i)
      const phoneInput = screen.getByPlaceholderText(/phone/i)
      const streetInput = screen.getByPlaceholderText(/street/i)
      const cityInput = screen.getByPlaceholderText(/city/i)

      console.log('Name Input Value:', nameInput.value)
      console.log('Phone Input Value:', phoneInput.value)
      console.log('Street Input Value:', streetInput.value)
      console.log('City Input Value:', cityInput.value)
    })

    await waitFor(() => expect(setError).not.toHaveBeenCalled())
  })
})