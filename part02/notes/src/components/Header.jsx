import reactLogo from '../assets/react.svg'

const Header = () => {
    return (
        <>
            <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <h1>Note App</h1>
        </>
    )
}

export default Header