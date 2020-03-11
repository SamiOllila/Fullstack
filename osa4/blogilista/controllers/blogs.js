const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.send(400)
    return
  }
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).send(result)
    })
})

module.exports = blogsRouter