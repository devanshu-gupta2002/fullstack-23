const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons =[
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const len=persons.length
  const date_time=new Date()
  response.send(
    `<div>Phonebook has info for ${len} people</div>
    <div>${date_time}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id===id)
  if(person)
  {
    response.json(person)
  }
  else{
    response.status(404).end()
  }
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

  if(!body.name)
  {
    return response.status(400).json(
      {
        error: "Name missing"
      }
    )
  }
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt()
  }

  if(!person.number)
  {
    return response.status(400).json(
      {
        error: "Number missing"
      }
    )
  }
  if(persons.find(per => per.name.toLowerCase()===person.name))
  {
    console.log("found")
    return response.status(400).json(
      {
      error: "name must be unique"
      }
    )
  }
  else{ 
    console.log("not found")
    persons=persons.concat(person)
    response.json(person)
    
  }
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})