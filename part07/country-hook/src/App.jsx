import { useState } from "react"
import { useField, useCountry } from "./hooks"
import Country from "./components/Country"

const App = () => {
  const [nameInput, reset] = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log(nameInput.value)
    reset()
  }

  return (
    <div>
      <h1>CountryApp</h1>
      <h3>Search for a country</h3>

      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App