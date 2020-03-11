const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.sendStatus(400)
    return
  }
  const blog = new Blog(request.body)

  await blog.save()
  response.status(201).send(blog)
})

blogsRouter.delete(`/:id`, async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.sendStatus(200)
})

module.exports = blogsRouter