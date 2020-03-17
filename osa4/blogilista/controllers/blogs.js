const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.get('/', async (request, response) => {
  const result = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(result)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.sendStatus(400)
  }

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  })
  await blog.save()
  user.blogs = user.blogs.concat(blog.id)
  await user.save()

  response.status(201).send(blog)
})

blogsRouter.put(`/:id`, async (request, response) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.sendStatus(200)
})

blogsRouter.delete(`/:id`, async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.sendStatus(200)
})

module.exports = blogsRouter