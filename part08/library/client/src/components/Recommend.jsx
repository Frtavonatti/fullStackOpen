import { useQuery } from "@apollo/client"
import { GET_BOOKS_BY_GENRE, GET_USER } from "../querys"

const Recommend = (props) => {
  const { loading: loadingUser, data: userData } = useQuery(GET_USER)

  const favouriteGenre = userData?.me?.favoriteGenre
  const { loading: loadingBooks, data: booksData } = useQuery(GET_BOOKS_BY_GENRE, { 
    variables: { genre: favouriteGenre} 
  })

  if (loadingUser || loadingBooks) {
    return 'Loading...'
  }

  const books = booksData ? booksData.allBooks : []
  
  if (!props.show) {
    return null
  }

  if (loadingBooks) {
    return 'Loading...'
  }

  return (
    <div>
      <h2>recomenations</h2>
      <h3>books in you favourite genre patters: {favouriteGenre}</h3>

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

export default Recommend