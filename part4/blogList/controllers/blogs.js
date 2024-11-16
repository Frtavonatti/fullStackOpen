const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

  const user = await User.findById('6737b881fe066af6a0509220')

  const blog = new Blog({
    title: body.title || 'default title',
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const newBlog = await blog.save() //al guardarlo recibimos su id como: new ObjectId('acá va el id)
  console.log(newBlog)
  
  // tambien modificamos el objeto user
  user.blogs = user.blogs.concat(newBlog._id) 
  await user.save()

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