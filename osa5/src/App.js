import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setAllUsers( users )
    )  
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      const users = await userService.getAll()
      setAllUsers(users)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const getUserBlogs = (username) => {
    const targetUser = allUsers.filter(user => user.username === username)
    const userBlogs = blogs.filter(blog => blog.user === targetUser.id)
    return userBlogs
  }

  if (user === null){
    return (
      <div>
        {<Login username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin} />}
      </div>
    )
  }

  return (
    <div>
      <p>Logged in: {user.name}</p>
      <p>blog id: {blogs[0].id}</p>
      <p>blog id: {blogs[1].id}</p>

      <h2>blogs</h2>
      {getUserBlogs(user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App