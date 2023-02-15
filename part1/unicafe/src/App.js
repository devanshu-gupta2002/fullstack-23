import { useState } from 'react'
// import { ReactDOM } from 'react'

const Buttons = (props) =>{
return (
  <button onClick={props.handleClick}>{props.text}</button>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>{
    setGood(good+1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral+1)
  }
  
  const handleBad = () =>{
    setBad(bad+1)
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Buttons handleClick={handleGood} text="good" />
        <Buttons handleClick={handleNeutral} text="neutral" />
        <Buttons handleClick={handleBad} text="bad" />
      </div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  
  )
}

export default App