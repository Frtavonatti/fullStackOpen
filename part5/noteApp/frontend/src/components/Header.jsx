import reactLogo from '../assets/react.svg'

const Header = ({ user, handleLogout }) => {
    const username = user ? user.username : 'Guest';

    const logoutButton = () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <h4 style={{ marginRight: '1rem' } }> {username} </h4>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

    return (
        <>
            {user && logoutButton()}

            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>

            <h1>Note App</h1>
        </>
    )
}

export default Header