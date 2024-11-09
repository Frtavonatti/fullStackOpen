const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Pasar todo a async/await
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal Server Error' })
  }
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.error(error))
})

module.exports = blogsRouter