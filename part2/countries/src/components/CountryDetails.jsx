import axios from "axios"
import { useState, useEffect} from "react"

const CountryDetails = ({ filteredCountries }) => {
    const [weather, setWeather] = useState('')

    const apiKey = import.meta.env.VITE_API_KEY
    const baseUrl = import.meta.env.VITE_BASE_URL
    const lat = 55.6761; // Latitude for Copenhagen
    const lon = 12.5683; // Longitude for Copenhagen

    // useEffect(() => {
    //     axios.get(`${baseUrl}/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    //     .then(res => {
    //         setWeather(res.data)
    //     })
    //     .catch(err => console.error(err))    
    // }, []);
    

    const styles = {
        backgroundColor: '#4b4b4b',
        borderRadius: '8px',
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)',
        padding: '1.5rem',
        textAlign: 'left'
    }

    const flagImage = {
        borderRadius: '20px',
        marginTop: '2rem',
        maxHeight: '200px'
    }

    return (
        <div style={styles}>
            <h2>Country Details:</h2>
            {filteredCountries.map((country, index) => {
                const flagsArray = Object.values(country.flags)
                const flagPng = flagsArray.find((link) => link.includes('png'))

                return (
                    <div key={index}>
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
                            
                            <div >
                                <img style={flagImage} src={flagPng} alt={`${country.name.common} flag`} />
                            </div>
                        </div>

                        {/* <div>
                            <h3>Wheater in {country.capital}</h3>
                            <p>Temperature: {weather.main.temp} C°</p>
                            <img src="" alt="" />
                            <p>Wind: {weather.wind.speed} m/s</p>
                        </div> */}

                    </div>
                )
            })}
        </div>
    )
}

export default CountryDetails