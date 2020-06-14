import React from 'react'

const LoginForm = ({onSubmit, username, password, onUsernameChange, onPasswordChange}) => (
  <form onSubmit={onSubmit}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={onUsernameChange}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">login</button>
    </form>
)

export default LoginForm