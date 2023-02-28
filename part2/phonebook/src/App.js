import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState(
    [{ name: 'Arto Hellas' }] 
  ) 
  const [newName, setNewName] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const nameChange = (event) =>{
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const Persons = ({per})=>{
    return(
      <div>
        {per.name}
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