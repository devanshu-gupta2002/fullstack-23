import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState(
    [{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }] 
  ) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  
  const addName = (event) =>{
    if (persons.find(person=>person.name===newName))
    {event.preventDefault()
      alert(`${newName} is already present`)
    setNewName('')
    }else{
    event.preventDefault()
    setPersons(persons.concat({name: newName, number: newNumber, id:persons.length+1}))
    setNewName('')
    setNewNumber('')}
  }

  const searchName = (event) =>{
    setSearch(event.target.value)
    // console.log(event.target.value)
  }

  const nameChange = (event) =>{
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

const showFilter = newSearch.length===0 ?
persons : persons.filter((person) => {
  if(person.name.toLowerCase().includes(newSearch.toLowerCase()))
  {return (person)}
})

  // console.log(newName)
  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with <input value={newSearch} onChange={searchName}/></div>
      <h2>Add a new</h2>
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
      {showFilter.map(per => 
        <Persons key = {per.id} per={per} />)}
    </div>
  )
}

export default App