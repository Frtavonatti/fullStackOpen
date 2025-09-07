import express from 'express'
const app = express()

import { connectToDatabase } from './utils/db.js'
import { PORT } from './utils/config.js'

app.use(express.json())

import notesRouter from './controllers/notes.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

// Controllers
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Config
const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()