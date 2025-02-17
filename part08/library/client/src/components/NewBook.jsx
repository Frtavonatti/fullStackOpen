import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, GET_BOOKS } from '../querys'

const NewBook = (props) => {
  const [ createBook ] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      try {
        // Read query with null genre to get all books
        const dataInStore = store.readQuery({ 
          query: GET_BOOKS,
          variables: { genre: null }
        })
        
        if (dataInStore) {
          store.writeQuery({
            query: GET_BOOKS,
            variables: { genre: null },
            data: {
              ...dataInStore,
              allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
            }
          })
        }
      } catch (error) {
        console.log('Error updating cache:', error)
      }
    }
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genre
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook