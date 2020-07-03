import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { like, removeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = (props) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))

  const likeBlog = async (blog) => {
    dispatch(like(blog))
    dispatch(notify(`You voted for ${blog.title}`, 5))
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return null
    }

    dispatch(removeBlog(blog))
  }


  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={props.user}
          likeBlog={() => likeBlog(blog)}
          deleteBlog={() => deleteBlog(blog)}
        />
      )}
    </div>
  )
}

export default BlogList