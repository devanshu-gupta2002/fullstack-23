const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api=supertest(app)
const Blog=require('../models/blog')
const helper=require('./test-helper')
const blog = require('../models/blog')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there are six notes', async() => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000) 

test('property id is returned', async() => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(blog => blog.id)
  for (const id of ids)
  {
    expect(id).toBeDefined()
  }
})

test('post creates a new blog', async() => {
  const newBlog = {
    title: "Test Blog",
    author: "Devanshu",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    "Test Blog"
  )
}, 10000)

test('missing likes default to zero', async() => {
  const newBlog = {
    title: "Test Blog",
    author: "Devanshu",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    __v: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  for (const blog of blogsAtEnd)
  {
    expect(blog.likes).toBeDefined()
  }
})

test('missing title/url field', async() => {
  const newBlog = {
    author: "Devanshu",
    likes: 4,
    __v: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting a blog post', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api 
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
})

test('updating likes in a blog', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  await api 
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 10})
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd[0]

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  expect(updatedBlog.likes).toBe(10)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async() => (
  await mongoose.connection.close()
))
