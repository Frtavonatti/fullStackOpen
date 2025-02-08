import reactLogo from '../assets/react.svg'

export default function Header() {
  return (
    <div>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
      </div>
      
      <h1>Phonebook</h1>
    </div>
  )
}
