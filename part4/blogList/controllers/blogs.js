const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.status(200).json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedNote = await Blog.findByIdAndDelete(id)
  response.status(204).json(deletedNote)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { likes } = request.body

  const updatedNote = await Blog.findByIdAndUpdate(
    id,
    { likes }, //campos a actualizar
    { new: true, runValidators: true, context: 'query' } //options
  )

  response.status(200).json(updatedNote)
})

module.exports = blogsRouter