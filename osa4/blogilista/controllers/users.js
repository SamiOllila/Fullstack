const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const result = await User.find({})
  response.json(result)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({error: 'Password and username must be at least 3 characters long'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  try{
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(exception) {
    return response.status(400).json({error: 'username is already taken'})
  }
})

module.exports = usersRouter