require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors=require('cors')
const Person = require('./module/person')

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if(error.name === 'CastError')
  {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

const unknownEndpoint = (erequest, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const len=persons.length
  const date_time=new Date()
  response.send(
    `<div>Phonebook has info for ${len} people</div>
    <div>${date_time}</div>`)
})

app.get('/api/notes/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))  
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

// app.put('/api/persons/:id', (request, response, next) => {
//   const body = request.body
//   const person = { 
//     name: body.name,
//     number: body.number,
//   }
//   Person.findByIdAndUpdate(request.params.id, person)
//     .then(updatedPerson => {
//       response.json(updatedPerson)
//     })
//     .catch(error => next(error))
// })

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})