const Notification = ({ message }) => {
  if (message.text === '') {
    return null;
  }

  const notificationStyle = {
    color: message.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  );
};

export default Notification;