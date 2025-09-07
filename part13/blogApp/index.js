import express from 'express'
const app = express()

import { connectToDatabase } from './utils/db.js'
import { PORT } from './utils/config.js'

app.use(express.json())

import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import { errorHandler } from './utils/middleware.js' 

// Controllers
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

// Config
const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
} 

start()