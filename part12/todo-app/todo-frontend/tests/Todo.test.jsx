import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Todo from '../src/Todos/Todo'

test('renders content', () => {
  const todo = {
    text: 'Component testing is done with react-testing-library',
    done: false
  }

  render(<Todo 
    todo={todo}
    onClickComplete={() => {}}
    onClickDelete={() => {}}
  />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})