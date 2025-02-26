import { useState } from 'react'

const App = () => {
  const personsArray = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [persons, setPersons] = useState(personsArray) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setPersons(personsArray.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPerson = { name: newName, number: newNumber }
    setPersons([...personsArray, newPerson])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={handleSearchChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={handleNewPerson}>
      <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <br/>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <h3 key={index}>{person.name} {person.number}</h3>)}
      <div>debug: {newName}, {newNumber}</div>
    </div>
  )
}

export default App
