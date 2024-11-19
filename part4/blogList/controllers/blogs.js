const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

// GET
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.status(200).json(blog)
})

// POST
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'user not authenticated' });
  }

  const blog = new Blog({
    title: body.title || 'default title',
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  response.status(201).json(newBlog)
})

// DELETE
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogId = request.params.id

  const blogToBeDeleted = await Blog.findById(blogId)
  if (!blogToBeDeleted) {
    response.status(400).json({ error: 'The blog doesnt exist' })
  }

  const user = request.user // podemos acceder a request.user gracias al middleware global userExtractor
  const userCreatedtheBlog = blogToBeDeleted.user.toString() === user.id.toString()

  if (userCreatedtheBlog) {
    const deletedNote = await Blog.findByIdAndDelete(blogId)

    user.blogs = user.blogs.filter(blog => blog.toString() !== blogId) // Actualizar el objeto User para eliminar la referencia al blog eliminado
    await user.save()

    response.status(204).json(deletedNote)
  } else {
    response.status(401).json({ error: 'You are not authorized to delete blogs that you did not create' })
  }
})

// PUT
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