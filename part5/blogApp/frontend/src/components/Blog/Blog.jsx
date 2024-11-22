import React from 'react'
import './Blog.css'

const Blog = ({ blog, user, deleteBlog }) => {
  const isCreatedByUser = blog.user.username === user.username;

  return (
    <div className="blog-container">
      <div className="blog-content">
        <strong>{blog.title}:</strong> <br/> {blog.author}
      </div>

      <div className="blog-actions">
        <button>View</button>
        { isCreatedByUser && <button onClick={deleteBlog} className="delete-button">Delete</button> }
      </div>
    </div>  
  )
}

export default Blog