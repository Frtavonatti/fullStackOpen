import axios from 'axios'
import { useState, useEffect } from 'react'
import CountryDetails from './components/CountryDetails'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('Denmark') 
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data))
      .catch(err => console.error('Error fetching countries:', err))
  }, [])

  useEffect(() => {
    const results = countries.filter((country) => 
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )

    if (searchValue === '') {
      setFilteredCountries([])
    } else if (results.length === 1) {
      setFilteredCountries(results)
    } else if (results.length > 1 && results.length <= 10) {
      setFilteredCountries(results)
    } else if (results.length > 10) {
      setFilteredCountries(results.slice(0, 10))
    } else {
      setFilteredCountries([])
    }
  }, [searchValue, countries])
  
  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const showCountryDetails = (country) => {
    setSearchValue(country.name.common)
    // console.log(country);
  }

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>Countries List</h1>
      </div>

      <div>
        <h3>Search a Country</h3>
        <input type="text" onChange={handleInputChange}/>
        <ul>
            {
                filteredCountries.length === 0 ? (
                    <li>No results available</li>
                ) : filteredCountries.length === 1 ? (
                    <CountryDetails filteredCountries={filteredCountries} />
                ) : (
                    filteredCountries.map((country, index) => (
                        <div key={index}>
                            <li>{country.name.common}</li>
                            <button onClick={() => showCountryDetails(country)}>Show more info</button>
                        </div>
                    ))
                )
            }
        </ul>
      </div>
    </>
  )
}

export default App