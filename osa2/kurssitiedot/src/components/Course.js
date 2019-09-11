import React from 'react'


const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = ({ parts }) => {
  const partsRender = parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)

  return (
    <div>
      {partsRender}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum,cur) => sum + cur.exercises, 0)
 
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
