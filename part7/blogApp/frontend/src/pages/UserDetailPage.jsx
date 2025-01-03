import Togglable from "../components/Togglable";

const UserDetailPage = ({ user }) => {
  const userCardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    padding: '1rem',
    border: '1px solid white',
    margin: '1rem'
  }
  
  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div style={userCardStyle}>
      <p>{user.username}</p>

      {user.blogs.length > 0 
        ? <Togglable buttonLabel={'Show blogs'}>
            <ul>
              {user.blogs.map(blog => 
                <li key={blog.id}>{blog.title}</li>
              )}
            </ul>
          </Togglable>
        : <p>No blogs yet</p>
      }
    </div>
  )
}

export default UserDetailPage