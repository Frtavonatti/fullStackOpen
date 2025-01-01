import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createBlog } from '../../reducers/blogsSlice'

const BlogForm = () => {
  const dispatch = useDispatch()

  // TO-DO: Implement a custom hook to handle form data
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
      try {
        dispatch(createBlog(formData))
        dispatch(setNotification({ type: 'success', text: 'Blog created succesfully' }))
      } catch (error) {
        dispatch(setNotification({ type: 'error', text: 'Failed to create new blog' }))
      }
    setFormData({ title: '', author: '', url: '' })
    }
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
            name='url'
            onChange={handleChange}
            value={formData.url}
          />

          <button type='submit'> Create </button>
        </form>
      </div>
    </>
  )
}

export default BlogForm