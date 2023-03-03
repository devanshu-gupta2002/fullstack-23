import { useState, useEffect } from 'react'
import Person from './components/person.js'
import Form from './components/form.js'
import Filter from './components/filter.js'
import axios from 'axios'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  
  const hook = () => {
    console.log('hook effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  // console.log('render', notes.length, 'notes')
  useEffect(hook, [])

  const addName = (event) =>{
    if (persons.find(person=>person.name===newName))
    {
      event.preventDefault()
      alert(`${newName} is already present`)
      setNewName('')
    }
    else{
    event.preventDefault()
    setPersons(persons.concat({name: newName, number: newNumber, id:persons.length+1}))
    setNewName('')
    setNewNumber('')}
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
      <Person showFilter={showFilter} />
      </div>
  )
}

export default App