import { useSelector, useDispatch } from "react-redux"
import { useMatch } from "react-router-dom"
import { likeBlog } from "../reducers/blogsSlice"

const BlogDetailPage = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

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
    </div>
  )
}

export default BlogDetailPage