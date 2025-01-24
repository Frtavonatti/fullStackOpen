import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Login from '../components/Login'
import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm/BlogForm'
import Togglable from '../components/Togglable'

const BlogsListPage = () => {
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

export default BlogsListPage