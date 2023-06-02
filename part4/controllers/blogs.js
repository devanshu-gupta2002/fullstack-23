const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})
  
blogsRouter.post('/', async(request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(body.token, process.env.SECRET)
  if(!body.token || !decodedToken.id) {
    return response.status(401).json({ error: "token invalid"})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  logger.info(blog)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
  const like = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, like, {new: true})
  updatedBlog ?
  response.status(200).end()
  : response.status(400).end()
})
  
module.exports = blogsRouter