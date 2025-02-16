import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../querys"

const Books = (props) => {
  const { loading, data } = useQuery(GET_BOOKS)
  const books = data ? data.allBooks : []

  console.log(books);

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
