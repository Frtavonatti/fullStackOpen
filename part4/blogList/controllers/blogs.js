const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// TO-DO:
// 1. Implementar Logger Middleware y Error Handler Middleware
// 2. Implementar Express Async Errors

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal Server Error' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.status(200).json(blog) 
})

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  } catch (error) {
    console.error(error)
    response.status(400).json({ error: 'Bad Request' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const deletedNote = await Blog.findByIdAndDelete(id)
    response.status(204).json(deletedNote)
  } catch (err) {
    console.error(err);
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const { likes } = request.body

    const updatedNote = await Blog.findByIdAndUpdate(
      id, 
      { likes }, //campos a actualizar
      { new: true, runValidators: true, context: 'query' } //options
    )
    response.status(200).json(updatedNote)

  } catch (err) {
    console.error(err);
  }
})

module.exports = blogsRouter