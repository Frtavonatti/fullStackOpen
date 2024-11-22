import Blog from './Blog'

const BlogList = ({ blogs, deleteBlog }) => {
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '10px', 
            marginTop: '20px'
        }}>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} deleteBlog={() => {deleteBlog(blog.id)}} />
                )}
        </div>
    )
}

export default BlogList