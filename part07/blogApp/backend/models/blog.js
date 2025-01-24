const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: { type: String, required: true },
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: { type: Array, default: [] }
})

blogSchema.set('toJSON', {
  //Options
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog