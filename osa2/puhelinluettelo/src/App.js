import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import NameServices from './services/names'


const App = () => {
  const [persons, setPersons] = useState([])
  
  const [ filterInput, setFilterInput ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const getPersonsFromApi = () => {
    NameServices
      .getAll()
      .then(response => {setPersons(response.data)})
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

  const handleDeleteClick = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return

    const newPersons = persons.filter(p => p.id !== person.id)
    setPersons(newPersons)
    NameServices
      .deletePerson(person.id)
      .then(response => {
        getPersonsFromApi()
      }).catch(error => getPersonsFromApi())
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = { 
      name: newName,
      number: newNumber
    }
    const storedNames = persons.map(onlyName => onlyName.name)
    if (storedNames.includes(nameObject.name)) {
      if (window.confirm(`${nameObject.name} is already added to phonebook. Replace the old number with new one?`)) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: persons.filter(p => p.name === nameObject.name)[0].id,
        }
        setNewName('')
        setNewNumber('')
        NameServices
          .updateName(updatedPerson)
          .then(response => getPersonsFromApi())
        return
      }
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')

    NameServices
      .addName(nameObject)
      .then(response => {
        getPersonsFromApi()
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
      <Persons persons={filteredPersons} handleDeleteClick={handleDeleteClick} />
    </div>
  )

}

export default App