import React, { useState } from 'react'

const LoginForm = ({loginUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => { setUsername(event.target.value) }
  const handlePasswordChange = (event) => { setPassword(event.target.value) }

  const handleLogin = (event) => {
    event.preventDefault()

    loginUser({
      username,
      password
    })

  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange} />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm