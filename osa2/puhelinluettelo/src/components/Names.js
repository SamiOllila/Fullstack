import React from 'react'


const Name = (props) => {
  return (
    <p>{props.name}</p>
    )
}

const Names = ({ persons }) => {
  const names = persons.map(person => <Name key={person.name} name={person.name}/>)

  return (
    <div>
      {names}
    </div>
  )
}

export default Names