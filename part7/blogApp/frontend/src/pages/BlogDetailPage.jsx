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

  return (
    <div>
      <h2> {blog.title} </h2>
      <a href={`http://${blog.url}`} target="blank" rel="noopener noreferrer"> {blog.url} </a>
      <p> Created by: {blog.author }</p>
      <div>
        <p>Likes: {blog.likes}</p>
        <button onClick={handleLike}>Like</button>
      </div>

      {comments.length > 0 && (
        <div>
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
        <form onSubmit={handleComment}>
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a new comment"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default BlogDetailPage