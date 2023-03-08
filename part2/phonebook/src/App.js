import { useState, useEffect } from 'react'
import Person from './components/person.js'
import Form from './components/form.js'
import Filter from './components/filter.js'
import noteService from "./services/person"
import Notification from './components/notification.js'
import "./index.css"


const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  
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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one`))
      {
        // event.preventDefault()
        const noteObject = {
          name : newName,
          id : newName,
          number : newNumber
        }
        noteService
          .update(noteObject.id, noteObject)
          .then(returnedPerson => {
            const updatedPersons =persons.map((person) => 
            person.id !== returnedPerson ? person : returnedPerson)
            setPersons(updatedPersons)  
            // console.log("updated")
            // setErrorMessage(
            //   `Added ${newName}`
            //   )   
            //   setTimeout(() => {
              //     setErrorMessage(null)}, 5000)
            })
            .catch(error => {
              setErrorMessage(
                `'${newName}' was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
              // window.location.reload()
      }
      
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
          setErrorMessage(
            `Added ${newName}`
          )  
          
          setTimeout(() => {
            setErrorMessage(null)}, 5000)
          })
          
        }
        setNewName('')
        setNewNumber('')
      }

const deleteEntry = (id, name) => {
  if (window.confirm(`Delete ${name}?`))
  (noteService
  .deleteEntry(id)
  .then(response => {
    const newPersons = persons.filter(person => person.id !== id)
    setPersons(newPersons)
    setErrorMessage(
      `Deleted ${name}`
    )   
    setTimeout(() => {
      setErrorMessage(null)}, 5000)
  }).catch(error => {
    setErrorMessage(
      `${name} was already removed from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)})
  )
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
      <Notification message ={errorMessage} />
      <Filter newSearch={newSearch} searchName={searchName} />
      <Form addName={addName} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
      <Person showFilter={showFilter} deleteEntry={deleteEntry}/>
      </div>
  )
}

export default App