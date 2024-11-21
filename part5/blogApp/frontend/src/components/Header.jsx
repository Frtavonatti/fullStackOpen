import reactLogo from '../assets/react.svg'

const Header = () => {
    return (
        <div>
            <h1>Blogs</h1>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
    )
}

export default Header