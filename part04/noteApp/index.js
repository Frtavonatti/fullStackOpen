const app = require('./app') // la aplicación Express real
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// MOVIDO A APP.JS
// const express = require('express')
// const app = express()
// const cors = require('cors')

// MOVIDO A CONFIG.JS
// require('dotenv').config()

// MODELS
// MOVIDO A ./CONTROLLER/NOTES.JS
// const Note = require('./models/note')

// MIDDLEWARE config
// Movidas a ./middleware e importadas a app.js:
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

// ROUTES
// Movidas a ./controller/notes.js
// Importadas a app.js => app.use('/api/notes', notesRouter)

// MIDDLEWARE use

// PORT CONECTION