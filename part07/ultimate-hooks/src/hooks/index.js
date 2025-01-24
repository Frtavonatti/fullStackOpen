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

 export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => setResources(res.data))
  }, []);

  const create = (resource) => {
    axios.post(baseUrl, resource)
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}