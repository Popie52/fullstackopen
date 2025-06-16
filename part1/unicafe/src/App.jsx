import { useState } from "react";

const Statistics = ({ good, bad , neutral }) => {
  const total = bad+ good + neutral;
  
  if(total === 0) {
    return (
      <p>No geedback given</p>
    )
  }
  const average = (good-bad)/total;
  const positive = (good/total)*100;

  return (
    <div>
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'average'} value={average} />
      <StatisticLine text={'positive'} value={`${positive}%`} />

    </div>
  );
};

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
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
          <button onClick={handleGood}>good</button>
          <button onClick={handleNeutral}>neutral</button>
          <button onClick={handleBad}>bad</button>
        </div>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
        
      </div>
    );
  
}

export default App;
