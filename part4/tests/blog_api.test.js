const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api=supertest(app)
const Blog=require('../models/blog')
const helper=require('./test-helper')
const blog = require('../models/blog')

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

afterAll(async() => (
  await mongoose.connection.close()
))
