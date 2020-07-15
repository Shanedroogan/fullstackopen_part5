import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const User = ({ username, numBlogs }) => (
  <tr>
    <td>{username}</td>
    <td>{numBlogs}</td>
  </tr>
)

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(response => {
        setUsers(response)
      })
  }, [])
  
  return (
    <table>
      <tr>
        <td></td>
        <td><strong>blogs created</strong></td>
      </tr>
      {users.map(user => (
        <User 
          key={user.id}
          username={user.username}
          numBlogs={user.blogs.length}
        />
      ))}
    </table>
  )
}

export default UserList