import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Si el navegador es refrescado, debemos setear el token nuevamente con la información que tenemos en localStorage
const getToken =  () => {
  const unformattedUser = window.localStorage.getItem("loggedUser")
  if (unformattedUser) {
    const JSONuser = JSON.parse(unformattedUser)
    setToken(JSONuser.token)
    console.log('using getToken'); 
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  if(!token) {
    getToken()
  }

  let config = {
    headers: { Authorization: token } 
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data 
}

export default { getAll, create, setToken }