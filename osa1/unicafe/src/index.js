import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good,neutral,bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/(all || 1)
  const positive = 100*(good/(all || 1))

  return (
    <div>
      <h1> statistics </h1>
      <p>good {good}</p> 
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
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
      <button onClick={handleGood}> good </button>
      <button onClick={handleNeutral}> neutral </button>
      <button onClick={handleBad}> bad </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)