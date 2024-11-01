const CountryDetails = ({ filteredCountries }) => {
    const styles = {
        backgroundColor: '#4b4b4b',
        borderRadius: '8px',
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)'
    }

    return (
        <div style={styles}>
            <h2>Country Details:</h2>
            {filteredCountries.map((country, index) => (
                <div key={index}>
                    <h3>{country.name.common}</h3>
                    <div>
                        <p><strong>Capital: </strong>{country.capital}</p>
                        <p><strong>Area: </strong>{country.area} m2</p>
                        <div>
                            <p><strong>Languages: </strong></p>
                            <ul>
                                {Object.values(country.languages).map((language, idx) => (
                                    <li key={idx}>{language}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    ) 
}

export default CountryDetails