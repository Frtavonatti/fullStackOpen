import React, { useState } from 'react'

const Button = ({ text, onClick }) => {
    return (
      <>
        <button onClick={onClick}>{text}</button>
      </>
    )
}


  
const Votes = ({ good, neutral, bad, handleGood, handleNeutral, handleBad }) => {
    return (
      <>
        <h2>Give feedback</h2>
        <Button text={'good'} onClick={handleGood}/>
        <Button text={'neutral'} onClick={handleNeutral}/>
        <Button text={'bad'} onClick={handleBad}/>
      </>
    )
}

export default Votes 