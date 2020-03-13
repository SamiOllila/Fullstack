const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  const defUser = await User.find({})
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: defUser[0]._id
  })
  await blog.save()
  defUser[0].blogs = defUser[0].blogs.concat(blog.id)
  await defUser[0].save()

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