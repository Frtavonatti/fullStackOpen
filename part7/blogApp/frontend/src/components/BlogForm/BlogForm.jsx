import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    if (!formData.author) {
      dispatch(setNotification({ type: 'error', text: 'You have to complete all fields' }))
    } else {
      createNewBlog(formData)
    }
    setFormData({ title: '', author: '', url: '' })
  }

  return (
    <>
      <div>
        <form
          onSubmit={addBlog}
          style={{
            display:'flex',
            flexDirection:'column',
            maxWidth: '400px',
            margin: '0 auto'
          }}>

          <h2>Add a new blog: </h2>

                Title:
          <input
            type="text"
            placeholder='Title'
            name='title'
            onChange={handleChange}
            value={formData.title}
          />

                Author*:
          <input
            type="text"
            placeholder='Author'
            name='author'
            onChange={handleChange}
            value={formData.author}
          />

                Link*:
          <input
            type="text"
            placeholder='Link'
            name='link'
            onChange={handleChange}
            value={formData.link}
          />

          <button type='submit'> Create </button>
        </form>
      </div>

    </>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}

export default BlogForm