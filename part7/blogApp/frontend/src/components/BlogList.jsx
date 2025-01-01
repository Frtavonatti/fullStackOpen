import { useSelector } from 'react-redux'
import Blog from './Blog/Blog'
import PropTypes from 'prop-types'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  const BlogListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '10px',
    marginTop: '20px'
  }

  return (
    <div style={BlogListStyle}>
      {[...blogs] // Copy the array to avoid mutating the original
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        )
      }
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default BlogList