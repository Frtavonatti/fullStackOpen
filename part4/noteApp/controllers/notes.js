const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

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
notesRouter.post('/', async (request, response) => {
  const body = request.body

  // userId será un campo requerido al momento de la solicitud
  // lo debemos enviar de alguna manera (por ahora por POSTMAN)
  const user = await User.findById(body.userId)

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