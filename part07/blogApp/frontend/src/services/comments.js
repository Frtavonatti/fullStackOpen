import axios from 'axios'
const baseUrl = '/api/blogs'

const getComments = async (id) => {
  const commentsUrl = `${baseUrl}/${id}/comments`
  const response = await axios.get(commentsUrl)
  return response.data
}

const addComment = async (id, comment) => {
  const commentsUrl = `${baseUrl}/${id}/comments`
  const response = await axios.post(commentsUrl, { comment: comment })
  return response.data
}

export default { getComments, addComment }