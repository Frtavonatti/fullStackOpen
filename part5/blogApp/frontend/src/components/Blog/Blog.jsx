import React from 'react'
import './Blog.css'

const Blog = ({ blog, user, deleteBlog }) => {
  const isCreatedByUser = blog.user.username === user.username

  // 5.7
  // [ ] Agrega un botón a cada blog que controle si se muestran o no todos los detalles sobre el blog.
  const toggleButton = () => {
    console.log('Clicked')
  }

  return (
    <div className="blog-container">
      <div className="blog-content">
        <strong>{blog.title}:</strong> <br/> 

        {/* Quiero que esto se oculte */}
        {blog.author} <br/> 
        {blog.url} <br/> 
        {/* ************************* */}

        Likes: {blog.likes}
      </div>

      <div className="blog-actions">


        <button onClick={toggleButton}>View</button>


        { isCreatedByUser && <button onClick={deleteBlog} className="delete-button">Delete</button> }
      </div>
    </div>  
  )
}

export default Blog