import React from 'react'
const Login = ({ login, handleLogin }) => (
  <div>
    <h1>Log in to application</h1>
    <form>
      <div>
        <label>
          Username: 
          <input type="text" value={login.username} onChange={handleLogin} />
        </label>
      </div>
      <div>
        <label>
          Password: 
          <input type="text" value={login.password} onChange={handleLogin} />
        </label>
      </div>
      <input type="submit" value="Login" />
    </form>
  </div>
)

export default Login
