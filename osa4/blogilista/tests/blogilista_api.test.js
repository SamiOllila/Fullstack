const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testhelper = require('../utils/test_helper')

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

describe('Blog tests', () => {

  beforeEach(async () => {
    await User.deleteMany({})

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

  test('new blog is added with POST if correct token is present', async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      url: "www.newBlog.com",
      likes: 1
    }
    const passwordHash = await bcrypt.hash('sekret1', 10)
    const user = new User({ username: 'username1', name: 'name1', passwordHash })
    await user.save()

    const result = await api
      .post('/api/login')
      .send({ username: user.username, password: 'sekret1'})

    const loginToken = result.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${loginToken}` })
      .expect(201)

    const response = await api.get('/api/blogs')
    const theAddedBlog = response.body.filter(blog => blog.title === newBlog.title && blog.author === newBlog.author && blog.url === newBlog.url && blog.likes === newBlog.likes)
    expect(theAddedBlog[0].title).toBe(newBlog.title)
  })

  test('new blog is not added if there is no token', async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      url: "www.newBlog.com",
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer asdadsadsadasdda` })
      .expect(401)
  })

  test('new blog is not added if token is invalid', async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      url: "www.newBlog.com",
      likes: 1
    }
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
    const newBlog = {
      title: "new blog",
      author: "new author",
      url: "www.newBlog.com",
      likes: 1
    }
    const passwordHash = await bcrypt.hash('sekret1', 10)
    const user = new User({ username: 'username1', name: 'name1', passwordHash })
    await user.save()

    const result = await api
      .post('/api/login')
      .send({ username: user.username, password: 'sekret1'})

    const loginToken = result.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${loginToken}` })
      .expect(201)

    const response = await api.get('/api/blogs')
    const blogToRemove = response.body.filter(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToRemove[0].id}`)
      .set({ Authorization: `bearer ${loginToken}` })
      .expect(200)
    
    const blogsFromDb = await api.get('/api/blogs')
    expect(blogsFromDb.body.filter(blog => blog.id === blogToRemove[0].id)).toStrictEqual([])
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
})

describe('User tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash1 = await bcrypt.hash('sekret1', 10)
    const passwordHash2 = await bcrypt.hash('sekret2', 10)

    let userObject = new User({ username: 'username1', name: 'name1', passwordHash1 })
    await userObject.save()
  
    userObject = new User({ username: 'username2', name: 'name2', passwordHash2 })
    await userObject.save()

  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of users is returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body.length).toBe(2)
  })

  test('POST adds the new user', async () => {
    const newUser = {
      username: "newUserName",
      name: "newUser",
      password: "newSecret"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await User.find({})
    expect(usersInDb.map(user => user.username).filter(name => name === newUser.username)[0]).toBe(newUser.username)
  })

  test('usernames and passwords with less than 3 characters are rejected', async () => {
    const tooShortUsername = {
      username: "a",
      name: "newUser",
      password: "newSecret"
    }

    await api
    .post('/api/users')
    .send(tooShortUsername)
    .expect(400)

    const tooShortPassword = {
      username: "shortpassword",
      name: "newUser",
      password: "a"
    }
    
    await api
    .post('/api/users')
    .send(tooShortPassword)
    .expect(400)
  })

  test('username must be unique', async () => {
    const newUser = {
      username: "newUserName",
      name: "newUser",
      password: "newSecret"
    }

    await api
      .post('/api/users')
      .send(newUser)
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
