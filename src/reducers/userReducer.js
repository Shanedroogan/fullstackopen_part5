import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return action.data
    case "LOG_OUT":
      return null
    case 'RETRIEVE_SESSION':
      return action.data
    default:
      return state
  }
}

export const logInUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      dispatch({
        type: 'SIGN_IN',
        data: user
      })
    } catch (exception) {
      dispatch(notify("Wrong Username or Password", 5))
    }
  }
}

export const logOutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export const retrieveSession = (user) => {
  return dispatch => {
    dispatch({
      type: 'RETRIEVE_SESSION',
      data: user
    })
  }
}

export default userReducer
