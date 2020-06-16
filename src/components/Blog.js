import React, { useState } from 'react'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [show, setShow] = useState(false)
  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 5,
    margin: 1,
    width: 500
  }

  const showDetails = () => {
    setShow(!show)
  }

  return (
    <div style={blogStyle} className='blog'>
      {show === false ?
        <div>
          {blog.title} {blog.author}
          <button onClick={showDetails} className='showDetails'>show</button>
        </div> :
        <div>
          {blog.title} {blog.author}
          <button onClick={showDetails} className='hideDetails'>hide</button>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likeBlog} type='submit'>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      }
      {user !== null && user.username === blog.user.username && show === true ?
        <button type='submit' onClick={deleteBlog}>delete</button> :
        false
      }
    </div>
  )
}

export default Blog