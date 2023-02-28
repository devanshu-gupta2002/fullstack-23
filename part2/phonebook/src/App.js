import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState(
    [{ name: 'Arto Hellas', number: '9235539398' }] 
  ) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addName = (event) =>{
    if (persons.find(person=>person.name===newName))
    {event.preventDefault()
      alert(`${newName} is already present`)
    setNewName('')
    }else{
    event.preventDefault()
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')}
  }

  const nameChange = (event) =>{
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const numberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const Persons = ({per})=>{
    return(
      <div>
        {per.name} {per.number}
      </div>
    )
  }



  // console.log(newName)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={nameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(per => 
        <Persons key = {per.name} per={per} />)}
    </div>
  )
}

export default App