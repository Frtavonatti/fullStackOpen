const baseUrl = 'http://localhost:3001/persons'
import axios from "axios"

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

export default {getAll, create}
// update, delete pendientes