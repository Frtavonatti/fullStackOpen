import reactLogo from '../src/assets/react.svg';

const Header = (props) => {
    return (
      <>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>{props.course}</h1>
      </>
    )
  }

export default Header;