import React from 'react'
import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, user, deleteBlog, updateLikes }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'Hide' : 'Show'

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  const handleLike = async () => {
    try {
      const updatedLikes = likes + 1
      await updateLikes(blog.id, updatedLikes)
      setLikes(updatedLikes)
    } catch (error) {
      console.error('Failed to update likes', error)
    }
  }

  const isCreatedByUser = blog.user.username === user.username

  return (
    <div className="blog-container">

      <div className="blog-content">
        <strong>{blog.title}:</strong> <br/> 
        <div style={showWhenVisible}>
          {blog.author} <br/> 
          {blog.url} <br/> 
        </div>
        Likes: {likes}
      </div>

      <div className="blog-actions">
        <button onClick={handleLike}>👍</button>
        <div>
          <button onClick={toggleVisibility}>{buttonText}</button>   
          {isCreatedByUser && 
            <button onClick={() => deleteBlog(blog.id)} className="delete-button">
              Delete
            </button>
          }
        </div>
      </div>
      
    </div>  
  )
}

export default Blog