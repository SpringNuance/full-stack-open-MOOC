import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  const StatisticLine = ({text, value, symbol}) => {
    return (
        <tr>
        <td>{text}</td> 
        <td>{value} {symbol}</td>
        </tr>
    )
  }


  const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0){
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    } else return (
      <div>
        <table>
        <StatisticLine text="good" value = {good} />
        <StatisticLine text="neutral" value = {neutral} />
        <StatisticLine text="bad" value = {bad} />
        <StatisticLine text="all" value = {good + neutral + bad}/>
        <StatisticLine text="average" value = {(good - bad)/(good + neutral + bad)}/>
        <StatisticLine text="positive" value = {100 * good/(good + neutral + bad)} symbol = "%"/>
        </table>
      </div>
    )

  }

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={increaseGood}
        text='good'
      />
      <Button
        onClick={increaseNeutral}
        text='neutral'
      />
      <Button
        onClick={increaseBad}
        text='bad'
      />
      <h1>statistics</h1>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    
    </div>
  )
}

export default App