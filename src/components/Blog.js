import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  const [numLikes, setLikes] = useState(0)
  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 5,
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
        <p>likes {numLikes} <button>like</button></p>
        <p>{blog.user}</p>
      </div>}
    </div>
  )
}

export default Blog