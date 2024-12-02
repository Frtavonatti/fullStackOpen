import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";

// Test Helper
const user = {
  id: '12345',
  username: 'testuser',
  name: 'Test User'
}

const blog = {
  title: 'testing blog component',
  author: 'tester',
  url: 'test.com',
  user: user
}

describe('blog component test', () => {
  let container
  const mockHandler = vi.fn()

  beforeEach(() => {
    const rendered = render(<Blog blog={blog} user={user} updateLikes={mockHandler}/>)
    container = rendered.container
  })

  test('blog should show title and author, but not the url or the number of likes by default', () => {
    const blogContent = container.querySelector('.blog-content')
    const toggleContent = container.querySelector('#toggleContent')

    expect(blogContent).toHaveTextContent('testing blog component')
    expect(blogContent).toHaveTextContent('tester')
    expect(toggleContent).not.toBeVisible()
  })

  test('blog url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const UIuser = userEvent.setup() 
    const button = screen.getByText('Show') 
    
    await UIuser.click(button)
    const toggleContent = container.querySelector('#toggleContent')
    expect(toggleContent).toBeVisible()
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const UIuser = userEvent.setup() 
    const button = screen.getByText('👍') 
    
    await UIuser.click(button)
    
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})

