const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad

    return (
      <>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <h3>TOTAL: {total}</h3>


      </>
    )
  }

  export default Statistics