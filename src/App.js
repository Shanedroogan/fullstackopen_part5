import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"
import Togglable from "./components/Togglable"
import { initializeBlogs, createBlog } from "./reducers/blogReducer"
import { logInUser, logOutUser, retrieveSession } from './reducers/userReducer'
import { notify } from "./reducers/notificationReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector(state => state.user)

  // Blog Form
  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(retrieveSession(user))
    }
  }, [dispatch])

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject, user))

    // setBlogs(blogs.concat(returnedBlog))
    /// NOTIFICATION
    dispatch(notify(`Added blog "${blogObject.title}" to the db.`, 5))
  }

  const handleLogin = ({ username, password }) => {
    dispatch(logInUser(username, password))
  }

  const handleLogout = () => {
    dispatch(logOutUser())
    window.localStorage.removeItem("loggedInBlogappUser")
    dispatch(notify("Sucessfully logged out.", 5))
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm loginUser={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>create new</h2>
          <p>{user.name} logged in.</p>
          <button onClick={handleLogout}>logout</button>

          {blogForm()}
        </div>
      )}
      <BlogList user={user} />
    </div>
  )
}

export default App
