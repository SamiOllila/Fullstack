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