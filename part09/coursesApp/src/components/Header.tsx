import reactLogo from '../assets/react.svg'

const Header = ({ courseName }: {courseName: string}): JSX.Element => {
  return(
    <div>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>{courseName}</h1>
    </div>
  )
}

export default Header
