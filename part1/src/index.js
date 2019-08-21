import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [value, setValue] = useState(10)

  return (
    <div>
      {value}
      <button onClick={() => console.log('clicked the button')}>
        button
      </button>
      <button>reset to zero</button>
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)