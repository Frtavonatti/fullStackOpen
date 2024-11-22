const Notification = ({ message }) => {
    const color = message.type === 'error' ? 'red' : 'green'

    return (
        <div style={{ 
            backgroundColor: '#4a4848', 
            borderRadius: '5px', 
            border: `2px solid ${color}`,
            padding: '10px' 
            }}
        >
            <h2 style={{ color: color }}> {message.text} </h2>
        </div>
    )
}

export default Notification