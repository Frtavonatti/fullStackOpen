import { useMutation} from "@apollo/client";
import { EDIT_AUTHOR, GET_AUTHORS} from "../querys";

const BirthYearForm = ({ authors }) => {
  const [ editAuthor, { loading, error }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }]
  })

  const authorsWithoutBirthYear = authors.filter(a => a.born === null)

  const submit = (event) => {
    event.preventDefault();
    const name = event.target.elements['authors'].value;
    const setBornTo = parseInt(event.target.elements['birthyear'].value);
    console.log(name, setBornTo, typeof setBornTo);
    
    editAuthor({ variables: { name, setBornTo } });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      <h3>Set Birth Year</h3>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label htmlFor="authors-select"> Choose an Author </label>

        <select name="authors" id="authors-select">
          {authorsWithoutBirthYear.map((author) => (
            <option key={author.id} value={author.name}> {author.name} </option>
          ))}
        </select>
        
        <input type="text" name="birthyear" placeholder="Insert birthyear"/>
        <button type="submit">Set Birthyear</button>
      </form>
    </div>
  )
}

export default BirthYearForm