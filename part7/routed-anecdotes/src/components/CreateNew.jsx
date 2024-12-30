import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const [content, resetContent] = useField('content')
  const [author, resetAuthor] = useField('author')
  const [info, resetInfo] = useField('info')
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content } />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={(e) => handleReset(e)}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew