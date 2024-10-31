const Notification = ({ message }) => {
    const style = {
        color: 'green',
        background: '#4d4d4d',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message !== null)  
    return(
        <>
            <div>
                <h4 style={style}>{message}</h4>
            </div>
        </>
    )
}

export default Notification