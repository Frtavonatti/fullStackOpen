import { Link } from "react-router-dom";

const UsersPage = ({ users }) => {
  const userListStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  const userLinkStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    border: '1px solid white',
    borderRadius: '5px',
    margin: '0.5rem'
  }

  return (
    <div>
      <div style={userListStyle}>
        {users.map(user => 
          <div style={userLinkStyle} key={user.id}>
            <Link to={`/users/${user.id}`} >
              {user.username}
            </Link>
            <p>{user.blogs.length > 0 ? <strong>Has made {user.blogs.length} blogs</strong> : 'No blogs yet' }</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersPage;