import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange, 
        likes: blogToChange.likes + 1
      }
      return state.map(b => b.id !== id ? b : changedBlog)
    case 'DELETE_BLOG':
      const blogId = action.data
      return state.filter(b => b.id !== blogId)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const blog = await blogService.create(content)
    blog.user = user
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const like = (blog) => {
  const blogToSend = {...blog, user: blog.user.id}
  return async dispatch => {
    blogService.like(blogToSend)
    dispatch({
      type: 'LIKE',
      data: blog.id
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog.id
    })
  }
}

export default blogReducer