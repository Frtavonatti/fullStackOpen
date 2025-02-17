import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_BOOKS } from "../querys"

const Books = (props) => {
  const { loading, data } = useQuery(GET_BOOKS)
  const books = data ? data.allBooks : []
  const [ genre, setGenre ] = useState(null)

  const handleClick = (event) => {
    setGenre(event.target.value.toLowerCase())
  }

  const booksToShow = genre === null 
    ? books 
    : books.filter((book) => book.genres.includes(genre))
  
  if (!props.show) {
    return null
  }

  if (loading) {
    return 'Loading...'
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Filter by genre</h3>
        <nav>
          <button onClick={handleClick} value="Refactoring">Refactoring</button>
          <button onClick={handleClick} value="Agile">Agile</button>
          <button onClick={handleClick} value="Patterns">Patterns</button>
          <button onClick={handleClick} value="Design">Design</button>
          <button onClick={handleClick} value="Crime">Crime</button>
          <button onClick={handleClick} value="Classic">Classic</button>
          <button onClick={() => setGenre(null)}>All genres</button>
        </nav>
      </div>
    </div>
  )
}

export default Books
