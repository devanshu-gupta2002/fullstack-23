const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  logger.info(blog)
  const savedBlogs = await blog.save()
  response.status(201).json(savedBlogs.toJSON())
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