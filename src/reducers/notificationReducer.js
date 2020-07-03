const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return action.data.message
    case 'REMOVE':
      return null
    default:
      return state
  }
}

export const notify = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        message: content
      }
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const removeNotification = (content) => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer