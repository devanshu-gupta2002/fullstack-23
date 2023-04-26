const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response) => {
  const {username, name, password} = request.body
  if(password.length<4){
    response.status(400).json({ error: "Password length must be greater than 3"})
  }
  // if(!request.body.has("password")){
  //   response.status(400).json({ error: "Password cannot be empty"})
  // }
  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    username, 
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async(request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author:1, url: 1, likes: 1})
  response.json(users)
})

module.exports = usersRouter