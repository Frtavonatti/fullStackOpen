const Notification = ({ text }) => {
  if (!text) { return null  }

  return (
    <div style={{ border: '2px solid white', borderRadius: '10px', padding: '10px' }}>
      <p>{text}</p>
    </div>
  )
}

export default Notification