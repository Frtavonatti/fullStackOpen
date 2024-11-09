const notesRouter = require('express').Router()
const Note = require('../models/note')

// GET
notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// DELETE
notesRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      response.json(deletedNote)
    })
    .catch((error) => next(error))
})

// POST
notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

// PUT
notesRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

module.exports = notesRouter