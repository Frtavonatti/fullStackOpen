const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { getTokenFrom } = require('../utils/middleware')

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
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken) {
    response.status(400).json({error: 'invalid token'})
  }  

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title || 'default title',
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const newBlog = await blog.save()
  console.log(newBlog)
  
  user.blogs = user.blogs.concat(newBlog._id) 
  await user.save()

  response.status(201).json(newBlog)
})

// DELETE
blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedNote = await Blog.findByIdAndDelete(id)
  response.status(204).json(deletedNote)
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