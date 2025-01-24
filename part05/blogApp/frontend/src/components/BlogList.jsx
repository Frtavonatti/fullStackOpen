import Blog from './Blog/Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, user, deleteBlog, updateLikes }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '10px',
      marginTop: '20px'
    }}>
      {blogs
        .sort((blogA, blogB) => {
          return blogB.likes - blogA.likes
        })
        .map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            user={user}
            deleteBlog={deleteBlog}
            updateLikes={updateLikes}
          />
        )
      }
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  updateLikes: PropTypes.func.isRequired
}

export default BlogList