import React, { useState } from 'react'
import Names from './components/Names'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = { name: newName}
    const storedNames = persons.map(onlyName => onlyName.name)
    if (storedNames.includes(nameObject.name)) {
      return (window.alert(`${nameObject.name} is already added to phonebook.`))
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />
    </div>
  )

}

export default App