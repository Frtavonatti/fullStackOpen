import axios from "axios"
import { useState, useEffect} from "react"
import './styles.css'

const CountryDetails = ({ filteredCountries }) => {
    const [weather, setWeather] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY
                const cityName = filteredCountries[0].capital
                const units = 'metric'
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`

                const response = await axios.get(apiUrl)
                setWeather(response.data)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching weather data:', err)
                setError('Error fetching weather data')
                setLoading(false)
            }
        }

        fetchWeather()
    }, [filteredCountries])


    if (loading) {
        return <div>Loading weather data...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const country = filteredCountries[0]
    const flagsArray = Object.values(country.flags)
    const flagPng = flagsArray.find((link) => link.includes('png'))

    return (
        <div className="container">
            <h2>Country Details:</h2>
            <h3>{country.name.common}</h3>

            <div>
                <p><strong>Capital: </strong>{country.capital}</p>
                <p><strong>Area: </strong>{country.area} m²</p>
                <h4><strong>Languages: </strong></h4>
                <ul>
                    {Object.values(country.languages).map((language, idx) => (
                        <li key={idx}>{language}</li>
                    ))}
                </ul>
                {flagPng && <img src={flagPng} alt={`${country.name.common} flag`} className="flagImage" />}
            </div>

            <div>
                <h4>Weather in {country.capital}</h4>
                <p><strong>Temperature: </strong>{weather.main.temp} °C</p>
                <p><strong>Weather: </strong>{weather.weather[0].description}</p>
                <p><strong>Wind: </strong> {weather.wind.speed} m/s</p>
            </div>
        </div>
    )
}

export default CountryDetails