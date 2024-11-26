import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

// Test Helper
const note = {
  content: 'Component testing is done with react-testing-library',
  important: true
}

// Tests
test('renders content', () => {
  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')

  expect(element).toBeDefined()
})


test('clicking the button calls event handler once', async () => {
  const mockHandler = vi.fn()
  render(
    <Note note={note} toggleImportance={mockHandler} />  )

  const user = userEvent.setup()  
  const button = screen.getByText('make not important')  
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})