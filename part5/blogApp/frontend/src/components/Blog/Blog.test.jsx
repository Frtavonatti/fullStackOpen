import { getByText, render, screen } from '@testing-library/react'
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

// ### 5.13: Pruebas de Listas de Blogs, paso 1
// - [ ] Verifica que el componente de blog muestra el título y el autor, pero no la URL ni el número de likes por defecto.

// ### 5.14: Pruebas de Listas de Blogs, paso 2
// - [ ] Verifica que la URL del blog y el número de likes se muestran al hacer clic en el botón de detalles.

// ### 5.15: Pruebas de Listas de Blogs, paso 3
// - [ ] Verifica que al hacer clic dos veces en el botón de like, se llama dos veces al controlador de eventos.

describe('blog component test', () => {

  test('blog should show title and author, but not the url or the number of likes by default', () => {
    const { container } = render(<Blog blog={blog} user={user} />)
    const blogContent = container.querySelector('.blog-content')

    expect(blogContent).toHaveTextContent('testing blog component')
    expect(blogContent).toHaveTextContent('tester')
  })

  test('blog url and number of likes are shown when the button controlling the shown details has been clicked', async () => {

  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {

  })
})

