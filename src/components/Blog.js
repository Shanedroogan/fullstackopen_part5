import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
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
    <div>
      {show === false ?
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={showDetails}>show</button>
      </div> :
      <div style={blogStyle}>
        {blog.title} {blog.author} 
        <button onClick={showDetails}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={likeBlog} type='submit'>like</button></p>
        <p>{blog.user.name}</p>
      </div>}
    </div>
  )
}

export default Blog