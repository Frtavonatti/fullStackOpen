import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [
    { type, value, onChange },
    reset
  ] 
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(res => setCountry({
        data: {
          name: res.data.name.common,
          capital: res.data.capital,
          population: res.data.population,
          flag: res.data.flags.png
        },
        found: true
      }))
      .catch(setCountry({ found: false }))
    }
  }, [name]);

  return country
}