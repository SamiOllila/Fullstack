import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleEvent}> {props.text} </button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.unit}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/(all || 1)
  const positive = 100*(good/(all || 1))

  if (all === 0){
    return (
      <div>
        <h1> statistics </h1>
        <p>No feedback given.</p> 
      </div>
    )
  }

  return (
    <div>
      <h1> statistics </h1>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="all" value={all}/>
          <Statistic text="average" value={average}/>
          <Statistic text="positive" value={positive} unit={"%"}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleEvent={handleGood} text="good"/>
      <Button handleEvent={handleNeutral} text="neutral"/>
      <Button handleEvent={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)