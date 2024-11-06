const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

// MODELS
const Note = require('./models/note')

// MIDDLEWARE
// Request logger 
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json()) //json-parser: nos permite acceder a datos enviados en body de un request (POST, PUT, PATCH)
app.use(cors())
app.use(requestLogger)
app.use(express.static('dist'))

// Unknown endpoint 
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }


// ROUTES
// GET
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes =>  {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.findById(id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.error(error)
            response.status(500).send({ error: 'malformatted id' })
        })
})


// DELETE
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.findByIdAndDelete(id)
        .then(deletedNote => {
            response.json(deletedNote)
        })
        // TO-DO: catch
})


// POST 
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})


// UNKNOWN ENDPOINT
app.use(unknownEndpoint)

// PORT CONECTION
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
