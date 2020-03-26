import React from 'react'
const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => (
  <div>
    <h1>Log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username: 
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
      </div>
      <div>
        <label>
          Password: 
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <input type="submit" value="Login" />
    </form>
  </div>
)

export default Login
