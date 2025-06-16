import { useState } from "react";

const Button = ({text, handle}) => {
  return(
    <button onClick={handle}>{text}</button>
  )
}

const Statistics = ({ good, bad , neutral }) => {
  const total = bad+ good + neutral;
  
  if(total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  const average = (good-bad)/total;
  const positive = (good/total)*100;

  return (
    <div>
      <table>
        <tbody>

      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={total} />
      <StatisticLine text={'average'} value={average} />
      <StatisticLine text={'positive'} value={`${positive}%`} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

    return (
      <div>
        <h1>give feedback</h1>
        <div>
          <Button handle = {handleGood} text={'good'} />
          <Button handle = {handleNeutral} text={'neutral'} />
          <Button handle = {handleBad} text={'bad'} />
        </div>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
        
      </div>
    );
  
}

export default App;
