import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  
  // Blog Form
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }

    const returnedBlog = await blogService
      .create(blogObject)
    
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogappUser')
  }

  const handleUsernameChange = (event) => { setUsername(event.target.value) }
  const handlePasswordChange = (event) => { setPassword(event.target.value) }

  // Blog Form
  const handleTitleChange = (event) => { setTitle(event.target.value) }
  const handleAuthorChange = (event) => { setAuthor(event.target.value) }
  const handleUrlChange = (event) => { setUrl(event.target.value) }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm 
          onSubmit={handleLogin}
          username={username}
          password={password}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
        /> :
        <div>
          <h2>create new</h2>
          <p>{user.name} logged in.</p>
          <button onClick={handleLogout}>logout</button>
          {<BlogForm 
            onSubmit={addBlog}
            title={title}
            onTitleChange={handleTitleChange}
            author={author}
            onAuthorChange={handleAuthorChange}
            url={url}
            onUrlChange={handleUrlChange}
           />}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App