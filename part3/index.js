require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors=require('cors')
const Person = require('./module/person')


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const len=persons.length
  const date_time=new Date()
  response.send(
    `<div>Phonebook has info for ${len} people</div>
    <div>${date_time}</div>`)
})

app.get('/api/notes/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request,response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id!==id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body=request.body

  if(body.name===undefined)
  {
    return response.status(400).json(
      {
        error: "Name missing"
      }
    )
  }
  if(body.number===undefined)
  {
    return response.status(400).json(
      {
        error: "Number missing"
      }
    )
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    
  
  
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})