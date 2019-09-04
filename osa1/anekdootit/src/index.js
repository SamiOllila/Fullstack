import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleEvent}> {props.text} </button>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const getMaxVotes = () => {
    const sorted = [...votes].sort().reverse()
    const max = sorted[0]
    const maxIndex = votes.indexOf(max)
    return maxIndex
  }

  const bestAnecdoteIndex = getMaxVotes()
  const bestAnecdote = anecdotes[bestAnecdoteIndex]
  
  const handleNext = () => {
    const rand = Math.floor(Math.random() * (props.anecdotes.length))
    setSelected(rand)
  }

  const handleVote = () => {
    const tempVotes = [...votes]
    tempVotes[selected] += 1
    setVotes(tempVotes)

  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
      </div>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        <p>Has {votes[selected]} votes</p>
      </div>
      <div>
        <Button handleEvent={handleVote} text="vote"/> 
        <Button handleEvent={handleNext} text="next anecdote"/>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
      </div>
      <div>
        {bestAnecdote}
      </div>
      <div>
        <p>Has {votes[bestAnecdoteIndex]} votes</p>
      </div>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)