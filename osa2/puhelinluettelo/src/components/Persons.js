import React from 'react'


const Person = ({ person,handleDeleteClick }) => {
  const { name, number } = person
  return (
      <div>
        <p>{name} {number}</p>
        <button onClick={() => {handleDeleteClick(person)}} size="sm" >
            delete
        </button>
      </div>
    )
}

const Persons = ({ persons,handleDeleteClick }) => {

  return (
    <div>
      {persons.map(person => <div> 
        <Person key={person.name} person={person} handleDeleteClick={handleDeleteClick} />
      </div>)}
    </div>
  )
}

export default Persons