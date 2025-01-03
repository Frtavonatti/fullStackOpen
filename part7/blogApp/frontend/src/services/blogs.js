import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  let config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async (id) => {
  let config = {
    headers: { Authorization: token }
  }

  const blogUrl = `${baseUrl}/${id}`
  const response = await axios.delete(blogUrl, config)
  return response.data
}

const update = async (id, likes) => {
  const blogUrl = `${baseUrl}/${id}`
  const response = await axios.put(blogUrl, { likes: likes })
  return response.data
}

export default { getAll, create, remove, update, setToken }