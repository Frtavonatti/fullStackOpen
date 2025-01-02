import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'
import BlogList from './BlogList'
import BlogForm from './BlogForm/BlogForm'
import Togglable from './Togglable'

const BlogsPage = () => {
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

  return (
    <div>
      {user ? (
        <div>
          <BlogList user={user} />
          <Togglable buttonLabel={'Create new Blog'} ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default BlogsPage