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
  blogObject = new Blog(newBlog)
  await blogObject.save()

  const response = await api.get('/api/blogs')
  const theAddedBlog = response.body.filter(blog => blog.title === newBlog.title && blog.author === newBlog.author && blog.url === newBlog.url && blog.likes === newBlog.likes)
  expect(theAddedBlog[0].title).toBe(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
