import { useQuery } from "@apollo/client"
import { GET_AUTHORS } from "../querys"

const Authors = (props) => {
  const { loading, error, data } = useQuery(GET_AUTHORS)
  const authors = data.allAuthors
  
  if (!props.show) {
    return null
  }

  if (loading) {
    return 'Loading...'
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
