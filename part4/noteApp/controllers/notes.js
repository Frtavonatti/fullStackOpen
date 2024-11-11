const notesRouter = require('express').Router()
const Note = require('../models/note')

// GET
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
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

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  const savedNote = await note.save()
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