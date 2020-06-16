import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')
  const [user, setUser] = useState(null)
  
  // Blog Form
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    showNotification(`Added blog "${blogObject.title}" to the db.`, 'success')
  }

  const likeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = {...blog, user: blog.user.id, likes: blog.likes + 1}

    const returnedBlog = await blogService.like(updatedBlog)
    returnedBlog.user = blog.user

    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a,b) => b.likes - a.likes))
  }

  const deleteBlog = async(id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return null
    }

    await blogService.deleteBlog(blog)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      showNotification('Successfully logged in!', 'success')
    } catch (exception) {
      showNotification('Wrong Username or Password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogappUser')
    showNotification('Sucessfully logged out.', 'success')
  }

  const showNotification = (messageContent, classSetting) => {
    setMessageClass(classSetting)
    setMessage(
      messageContent
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm 
        loginUser={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create blog' ref={blogFormRef}>
      <BlogForm 
        createBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageClass={messageClass} />
      {user === null ?
        loginForm() :
        <div>
          <h2>create new</h2>
          <p>{user.name} logged in.</p>
          <button onClick={handleLogout}>logout</button>

          {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} 
          likeBlog={() => likeBlog(blog.id)}
          deleteBlog={() => deleteBlog(blog.id)} 
        />
      )}
    </div>
  )
}

export default App