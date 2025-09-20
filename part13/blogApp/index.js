import express from 'express'
const app = express()

import { connectToDatabase } from './utils/db.js'
import { PORT } from './utils/config.js'

app.use(express.json())

import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import authorsRouter from './controllers/authors.js'
import readingListRouter from './controllers/readingLists.js'
import { errorHandler } from './utils/middleware.js' 

// Controllers
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListRouter)
app.use(errorHandler)

// Config
const start = async () => {
  try {
    await connectToDatabase()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()