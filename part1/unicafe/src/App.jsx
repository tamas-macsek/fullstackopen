import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = () => {
    return (good - bad) / (good + bad + neutral)
  }

  const positive = () => {
    return (good / (good + bad + neutral)) * 100
  }

  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )

  }

  const Statistics = () => {
    if (good + bad + neutral === 0) {
      return <p>No feedback given</p>
    }
    return (
      <table>
        <tbody>

          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"All clicks"} value={good + neutral + bad} />
          <StatisticLine text={"Average"} value={average()} />
          <StatisticLine text={"Positive"} value={positive() + " %"} />
        </tbody>

      </table>)
  }

  return (
    <div>
      <h1>Give Feedback</h1>

      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <h1>Statistics</h1>
      <Statistics />

    </div>
  )
}

export default App