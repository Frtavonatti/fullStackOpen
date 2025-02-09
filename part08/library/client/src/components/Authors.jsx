import { useQuery } from "@apollo/client"
import { GET_AUTHORS } from "../querys"
import BirthYearForm from "./BirthYearForm"

const Authors = (props) => {
  const { loading, data } = useQuery(GET_AUTHORS)
  const authors = data ? data.allAuthors : []
  
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

      <BirthYearForm authors={authors}/>
    </div>
  )
}

export default Authors
