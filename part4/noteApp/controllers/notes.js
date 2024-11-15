const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET
notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user')
  response.status(200).json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const note = await Note.findById(id)
  if (note) {
    response.status(200).json(note)
  } else {
    response.status(404).end()
  }
})

// DELETE
notesRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const deletedNote = await Note.findByIdAndDelete(id)
  response.status(204).json(deletedNote)
})

// POST
// función auxiliar para aislar authorization header
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  //el token recibe el id porque le fue asignado al momento de crearlo en userForToken (controllers/login)
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id, 
  })

  const savedNote = await note.save()

  // El objeto user también cambia:
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

// PUT
notesRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { content, important } = request.body

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
  response.json(updatedNote)
})

module.exports = notesRouter