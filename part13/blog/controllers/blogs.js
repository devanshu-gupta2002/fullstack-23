const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async(req, res) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
})


router.post('/', async(req, res) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
})

const blogFinder = async(req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/:id', blogFinder, async(req, res) => {
  if(!req.blog) {
    return res.status(404).json({error: "Invalid Id"})
  }
  return res.json(req.blog)
})

router.delete('/:id', blogFinder, async(req, res) => {
  if(req.blog) {
    await req.blog.destroy()
    return res.status(204).end()
  } else {
    return res.status(404).json({error: "invalid Id"})
  }
})

router.put('/:id', blogFinder, async(req, res) => {
  if(req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).json({error: "Invalid Id"})
  }
})

module.exports = router