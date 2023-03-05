import { useState, useEffect } from 'react'
import Person from './components/person.js'
import Form from './components/form.js'
import Filter from './components/filter.js'
import noteService from "./services/person"

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addName = (event) =>{
    if (persons.find(person=>person.name===newName))
    {
      event.preventDefault()
      alert(`${newName} is already present`)
      setNewName('')
    }
    else{
    event.preventDefault()
    const noteObject = {
      name: newName, 
      number: newNumber, 
      id: newName,
    }
    noteService
        .create(noteObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')})
  }}

const deleteEntry = (id, name) => {
  if (window.confirm(`Delete ${name}?`))
  (noteService
  .deleteEntry(id)
  .then(response => {
    const newPersons = persons.filter(person => person.id !== id)
    setPersons(newPersons)
  }))
}

  const searchName = (event) =>{
    setSearch(event.target.value)
  }

  const nameChange = (event) =>{
    setNewName(event.target.value)
  }
  const numberChange = (event) =>{
    setNewNumber(event.target.value)
  }

const showFilter = newSearch.length===0 ?
// eslint-disable-next-line
persons : persons.filter((person) => {
  if(person.name.toLowerCase().includes(newSearch.toLowerCase()))
  {return (person)}
  
})

  return (
    <div>
      <Filter newSearch={newSearch} searchName={searchName} />
      <Form addName={addName} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
      <Person showFilter={showFilter} deleteEntry={deleteEntry}/>
      </div>
  )
}

export default App