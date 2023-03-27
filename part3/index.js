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

// let persons =[
//   { 
//     id: 1,
//     name: "Arto Hellas", 
//     number: "040-123456"
//   },
//   { 
//     id: 2,
//     name: "Ada Lovelace", 
//     number: "39-44-5323523"
//   },
//   { 
//     id: 3,
//     name: "Dan Abramov", 
//     number: "12-43-234345"
//   },
//   { 
//     id: 4,
//     name: "Mary Poppendieck", 
//     number: "39-23-6423122"
//   }
// ]


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

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id===id)
//   if(person)
//   {
//     response.json(person)
//   }
//   else{
//     response.status(404).end()
//   }
// })

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

const getRandomInt = () =>{
  return Math.floor(Math.random() * 1000);
}

app.post('/api/persons', (request, response) => {
  // console.log(getRandomInt)
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

  // if(persons.find(per => per.name.toLowerCase()===person.name))
  // {
  //   console.log("found")
  //   return response.status(400).json(
  //     {
  //     error: "name must be unique"
  //     }
  //   )
  // }
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    
  
  
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})