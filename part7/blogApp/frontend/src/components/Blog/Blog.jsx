import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogsSlice'
import { setNotification } from '../../reducers/notificationReducer'
import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'Hide' : 'Show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (likes) => {
    try {      
      const updatedLikes = likes + 1
      dispatch(likeBlog(blog.id, updatedLikes))
    } catch (error) {
      console.error('Failed to update likes', error)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        dispatch(deleteBlog(id))
        dispatch(setNotification({ type: 'success', text: 'blog deleted successfully' }))
      } catch (error) {
        console.error('Failed to delete blog', error)
        dispatch(setNotification({ type: 'error', text: 'Its not possible to delete this blog' }))
      }
    }
  }

  const isCreatedByUser = blog.user.username === user.username

  return (
    <div data-testid={'blog'} className="blog-container">

      <div className="blog-content">
        <strong>{blog.title}:</strong> <br/>
        {blog.author} <br/>

        <div id={'toggleContent'} style={showWhenVisible}>
          {blog.url} <br/>
          Likes: {blog.likes} <br/>
        </div>
      </div>

      <div className="blog-actions">
        <button onClick={() => handleLike(blog.likes)}>👍</button>
        <div>
          <button onClick={toggleVisibility}>{buttonText}</button>
          {isCreatedByUser &&
            <button onClick={() => handleDelete(blog.id)} className="delete-button">
              Delete
            </button>
          }
        </div>
      </div>

    </div>
  )
}

export default Blog