import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const createAnecdote = (content) => {
  return axios.post(baseUrl, content)
  .then(res => res.data)
}

export { getAll, createAnecdote }