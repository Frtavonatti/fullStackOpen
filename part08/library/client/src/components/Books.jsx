import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_BOOKS } from "../querys"


const Books = (props) => {
  const [ genre, setGenre ] = useState(null)
  
  const { loading, data, error } = useQuery(GET_BOOKS, {
    variables: { genre }
  })

  const handleClick = (event) => {
    setGenre(event.target.value.toLowerCase())
  }
  
  if (!props.show) return null
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`
  if (!data) return 'No data available'
  
  const books = data ? data.allBooks : []

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
          {books.map((a) => (
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
