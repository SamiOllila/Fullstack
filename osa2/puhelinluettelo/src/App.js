import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])

  const [ filterInput, setFilterInput ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const getPersonsFromApi = async () => {
    const response = await axios.get('http://localhost:3001/persons')
    setPersons(response.data)
  }

  useEffect(() => {
    getPersonsFromApi()
  }, [])


  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = { 
      name: newName,
      number: newNumber
    }
    const storedNames = persons.map(onlyName => onlyName.name)
    if (storedNames.includes(nameObject.name)) {
      return (window.alert(`${nameObject.name} is already added to phonebook.`))
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')

    axios
    .post('http://localhost:3001/persons', nameObject)
    .then(response => {
      console.log(response)
    })
  }

  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(filterInput.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterInput={filterInput} handleFilterInputChange={handleFilterInputChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )

}

export default App