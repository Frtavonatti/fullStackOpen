const Blog = ({ blog, deleteBlog }) => (
  <div style={{ 
    border: '1px solid #ccc', 
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)', 
    padding: '10px', 
    backgroundColor: '#4a4848', 
    width: '250px',
    height: '150px' 
  }}>
    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
      <strong>{blog.title}:</strong> <br/> {blog.author}
    </div>
    <button onClick={deleteBlog} style={{ justifySelf: 'flex-end' }}>Delete</button>
  </div>  
)

export default Blog