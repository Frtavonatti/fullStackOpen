import Blog from './Blog/Blog'

const BlogList = ({ blogs, user, deleteBlog }) => {
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '10px', 
            marginTop: '20px'
        }}>
            {blogs.map(blog =>
                <Blog key={blog.id} 
                    blog={blog} 
                    user={user} 
                    deleteBlog={() => {deleteBlog(blog.id) 
                }} />
            )}
        </div>
    )
}

export default BlogList