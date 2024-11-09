//Configuración y dependencias
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// Configuración de Mongoose
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

console.log('Starting connection to MONGODB')
mongoose.connect(process.env.MONGODB_URI)
    .then(console.log('Connected succesfully to the DB'))
    .catch(error => console.error(error))

// MIDDLEWARE global
app.use(cors())
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => console.error(error))
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.error(error))
})

// PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
