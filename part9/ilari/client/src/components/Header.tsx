import reactLogo from "../assets/react.svg";

const Header = () => (
  <div>
    <div className="mb-8 flex justify-center items-center">
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo h-20 w-20" alt="React logo" />
      </a>
    </div>
    <h1 className="mb-8">Ilari Flights</h1>
  </div>
)

export default Header