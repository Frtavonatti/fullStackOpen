import React from 'react'
import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'Hide' : 'Show'

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  const isCreatedByUser = blog.user.username === user.username
  // TO-DO: fix delete button problem: when creating a new note, user is undefined because it must wait for the POST request to complete
  // console.log('USER:', user.username, 'BLOG:', blog.user.username)

  return (
    <div className="blog-container">

      <div className="blog-content">
        <strong>{blog.title}:</strong> <br/> 

        <div style={showWhenVisible}>
          {blog.author} <br/> 
          {blog.url} <br/> 
        </div>

        Likes: {blog.likes}
      </div>

      <div className="blog-actions">
        <button onClick={toggleVisibility}>{buttonText}</button>
        { isCreatedByUser && <button onClick={deleteBlog} className="delete-button">Delete</button> }
      </div>

    </div>  
  )
}

export default Blog