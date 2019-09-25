import React from 'react'


const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
    )
}

const Persons = ({ persons }) => {
  const names = persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)

  return (
    <div>
      {names}
    </div>
  )
}

export default Persons