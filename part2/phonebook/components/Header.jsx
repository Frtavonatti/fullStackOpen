import reactLogo from '../src/assets/react.svg'

const Header = () => {
    return (
        <div>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
                <h1>Phonebook App</h1>  
            </a>
      </div>
    )
}

export default Header