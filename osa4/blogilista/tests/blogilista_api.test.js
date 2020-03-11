const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "testi1",
    author: "Someone1",
    url: "www.test1.com",
    likes: 3
  },
  {
    title: "testi2",
    author: "Someone2",
    url: "www.test2.com",
    likes: 4
  },
  {
    title: "testi3",
    author: "Someone3",
    url: "www.test3.com",
    likes: 15
  },
  {
    title: "testi4",
    author: "Someone4",
    url: "www.test4.com",
    likes: 2
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(4)
})

test('blogs have id field', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(element => {
    expect(element.id).toBeDefined()
  });
})

test('new blog is added with POST', async () => {
  const newBlog = {
    title: "new blog",
    author: "new author",
    url: "www.newBlog.com",
    likes: 1
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  const theAddedBlog = response.body.filter(blog => blog.title === newBlog.title && blog.author === newBlog.author && blog.url === newBlog.url && blog.likes === newBlog.likes)
  expect(theAddedBlog[0].title).toBe(newBlog.title)
})

test('likes is 0 by default if no value is given', async () => {
  const AnotherNewBlog = {
    title: "new blog",
    author: "new author",
    url: "www.newBlog.com"
  }
  blogObject = new Blog(AnotherNewBlog)
  expect(blogObject.likes).toBe(0)
})

test('blogs with no title or url are not accepted', async () => {
  const notValidBlog = {
    author: "new author",
    likes: 4
  }
  await api
    .post('/api/blogs')
    .send(notValidBlog)
    .expect(400)
})

test('DELETE removes a correct blog', async () => {
  const response = await api.get('/api/blogs')
  const blogToRemove = response.body[0]

  await api
    .delete(`/api/blogs/${blogToRemove.id}`)
    .expect(200)
  
  const result = await api.get('/api/blogs')
  expect(result.body.filter(blog => blog.id === blogToRemove.id)).toStrictEqual([])
})

test('PUT updates a correct blog', async () => {
  const response = await api.get('/api/blogs')
  let blogToUpdate = response.body[0]
  blogToUpdate.likes = 50

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const result = await api.get('/api/blogs')
  expect(result.body.filter(blog => blog.id === blogToUpdate.id)[0].likes).toBe(50)
})

afterAll(() => {
  mongoose.connection.close()
})
