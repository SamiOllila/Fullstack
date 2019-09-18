import React from 'react'


const Name = (props) => {
  return (
    <p>{props.name} {props.number}</p>
    )
}

const Names = ({ persons }) => {
  const names = persons.map(person => <Name key={person.name} name={person.name} number={person.number} />)

  return (
    <div>
      {names}
    </div>
  )
}

export default Names