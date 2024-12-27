const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return notification ? (
    <div style={style}>
      <p>{notification}</p>
    </div>
  ) : null
}

export default Notification
