import { useState } from 'react'
// import { ReactDOM } from 'react'

const Buttons = (props) =>{
return (
  <button onClick={props.handleClick}>{props.text}</button>
)
}

const Statistics = ({good, bad, neutral}) =>{
  const all = good + bad + neutral
  const average = (good-bad)/(all)
  const positive = (good/(good+bad+neutral))*100
  if(all===0){
    return(
      <div>No feedback given</div>
    )
  }
  else{
  return(
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )}

  
  }
  const StatisticLine = ({text, value}) =>{
    return(
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
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
    <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  
  )
}

export default App