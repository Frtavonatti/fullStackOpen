import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('testing Blogform Component', () => {
  const mockHandler = vi.fn()
  const mockMessage = vi.fn() //unused
  const user = userEvent.setup()

  const setup = async () => {
    render(<BlogForm createNewBlog={mockHandler} setMessage={mockMessage} />)
    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const linkInput = screen.getByPlaceholderText('Link')

    return {
      titleInput,
      authorInput,
      linkInput,
    }
  }

  const fillForm = async (titleInput, authorInput, linkInput) => {
    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(linkInput, 'http://testlink.com')
  }

  beforeEach(() => {
    mockHandler.mockClear()
    mockMessage.mockClear()
  })


  test('handleChange updates formData state correctly', async () => {
    const { titleInput, authorInput, linkInput } = await setup()
    await fillForm(titleInput, authorInput, linkInput)

    expect(titleInput.value).toBe('Test Title')
    expect(authorInput.value).toBe('Test Author')
    expect(linkInput.value).toBe('http://testlink.com')
  })

  test('createNewBlog is called when form is submitted', async () => {
    const { titleInput, authorInput, linkInput } = await setup()
    await fillForm(titleInput, authorInput, linkInput)

    const button = screen.getByText('Create')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
