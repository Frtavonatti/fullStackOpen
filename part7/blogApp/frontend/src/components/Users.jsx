import axios from "axios";
import { useEffect, useState } from "react";
import Togglable from "./Togglable";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then(response => {
      setUsers(response.data)
    })
  }, [])

  const userCardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    padding: '1rem',
    border: '1px solid white',
    margin: '1rem'
  }

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map(user => 
          <div style={userCardStyle} key={user.id}>
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
          </div>)}
      </div>
    </div>
  );
}

export default Users;