import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useMatch } from "react-router-dom"
import { likeBlog } from "../reducers/blogsSlice"
import blogService from '../services/blogs'

const BlogDetailPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const [comments, setComments] = useState([])

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    blogService.getComments(blog.id)
    .then(comments => {
      setComments(comments)
    })
  }, [blog.id])

  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id, blog.likes + 1))
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
    </div>
  )
}

export default BlogDetailPage