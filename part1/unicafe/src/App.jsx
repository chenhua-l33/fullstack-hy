import { useState } from 'react'

const StatisticLine = (props) => {
  const {text, value} = props
  const displayValue = text === "positive" ? `${value.toFixed(1)} %` : value;
  return(
    <div>
      <div>{text} {displayValue}</div>
    </div>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, allReviews, average, positive } = props
  return  allReviews === 0
    ? <div>No feedback given</div>
    : (<div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="All" value ={allReviews} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} />
    </div>)
}

const Button = (props) => {
  const {func, text} = props
  return(
      <button onClick = {func}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAll] = useState([])

  const increaseGood = () => {
    setAll(allReviews.concat(1))
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setAll(allReviews.concat(0))
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setAll(allReviews.concat(-1))
    setBad(bad + 1)
  }

  const calculateAvg = () => {
    return allReviews.length === 0
    ? 0
    : allReviews.reduce((acc, c) => acc + c, 0) / allReviews.length;
  }


  const calculatePositive = () => 
    { return allReviews.length === 0
      ? 0
      : (good / allReviews.length) * 100
    }

  return (
    <div>
    <h1>give feedback</h1>
    <Button func = {increaseGood} text = "good" />
    <Button func = {increaseNeutral} text = "neutral" />
    <Button func = {increaseBad} text = "bad" />
    <h1>statistics</h1>
    <Statistics         
    good={good}
    neutral={neutral}
    bad={bad}
    allReviews={allReviews.length}
    average={calculateAvg()}
    positive={calculatePositive()} />
    </div>
  )
}

export default App