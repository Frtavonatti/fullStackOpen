//Configuración y dependencias
const config = require('./utils/config')
const express = require('express')
require ('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

// Configuración de Mongoose
console.log('Starting connection to MONGODB')
mongoose.connect(config.MONGODB_URI)
  .then(console.log('Connected succesfully'))
  .catch(error => console.error(error))

// MIDDLEWARE global
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)

// ROUTES
// app.use('/api/blogs', middleware.userExtractor, blogsRouter) -> Versión para que los usuarios vean solo los blogs que ellos crearon
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
// test route
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// MIDDLEWARE manejo de rutas
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
