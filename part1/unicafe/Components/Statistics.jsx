const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad

    if (total === 0) {
        return <p>No feedback given</p>
    }

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