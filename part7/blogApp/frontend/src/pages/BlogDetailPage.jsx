import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useMatch } from "react-router-dom"
import { likeBlog } from "../reducers/blogsSlice"
import commentService from '../services/comments'

const BlogDetailPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    if (blog) {
      commentService.getComments(blog.id)
      .then(comments => {
        setComments(comments)
      })
      .catch(error => {
        console.error('Failed to get comments', error)
      })
    } 
  }, [blog])

  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id, blog.likes + 1))
  } 

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = await commentService.addComment(blog.id, newComment)
      setComments(updatedBlog.comments)
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment', error)
    }
  }

  const blogContainerStyle = {
    border: '1px solid white',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '1rem',
    margin: '1rem'
  }

  const likesContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem'
  }

  const commentListStyle = {
    border: '1px solid white',
    margin: '1rem',
    borderRadius: '5px',  
  }

  return (
    <div>
      <div style={blogContainerStyle}>
        <h2> {blog.title} </h2>
        <a href={`http://${blog.url}`} target="blank" rel="noopener noreferrer"> {blog.url} </a>
        <p> Created by: {blog.author }</p>
        <div style={likesContainerStyle}>
          <button onClick={handleLike}>👍</button>
          <p>{blog.likes} likes</p>
        </div>
      </div>

      {comments.length > 0 && (
        <div style={commentListStyle}>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => 
              <li key={index}>{comment}</li>
            )}
          </ul>
        </div>
      )} 

      <div>
        <h3>Add a comment</h3>
        <form onSubmit={handleComment} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a new comment"
            style={{marginBottom: '1rem', padding: '0.6rem', width: '50%'}}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default BlogDetailPage