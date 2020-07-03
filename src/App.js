import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [user, setUser] = useState(null)

  // Blog Form
  const blogFormRef = React.createRef()

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
  //   )
  // }, [])

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
    dispatch(createBlog(blogObject, user))
    
    // setBlogs(blogs.concat(returnedBlog))
    /// NOTIFICATION
    dispatch(notify(`Added blog "${blogObject.title}" to the db.`, 5))
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
      
      dispatch(notify('Successfully logged in!', 5))
    } catch (exception) {
      dispatch(notify('Wrong Username or Password', 5))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogappUser')
    dispatch(notify('Sucessfully logged out.', 5))
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
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <h2>create new</h2>
          <p>{user.name} logged in.</p>
          <button onClick={handleLogout}>logout</button>

          {blogForm()}
        </div>
      }
      <BlogList user={user}/>
    </div>
  )
}

export default App