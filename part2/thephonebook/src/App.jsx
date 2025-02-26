import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons([...persons, newPerson])
    setNewName('') // تفريغ الحقل بعد الإضافة
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewName}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <h3 key={index}>{person.name}</h3>)}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
