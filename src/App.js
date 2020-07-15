import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"
import UserList from './components/UserList'
import Togglable from "./components/Togglable"
import { initializeBlogs, createBlog } from "./reducers/blogReducer"
import { logInUser, logOutUser, retrieveSession } from './reducers/userReducer'
import { notify } from "./reducers/notificationReducer"
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useRouteMatch
} from "react-router-dom"

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

  const padding = {
    padding: 5
  }

  return (
    <div>
      <h1>blogs</h1>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='users'>users</Link>
        {user
          ? <em>{user.name} logged in</em>
          : <Link style={padding} to="/login"></Link>
        }
      </div>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <Switch>
        <Route path="/blogs">
          {user === null ? <div></div>: (
            <div>
              <h2>create new</h2>
              {blogForm()}
            </div>
          )}
          <BlogList user={user} />
        </Route>
        <Route>
          <UserList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
