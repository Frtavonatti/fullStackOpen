import mongoose from "mongoose"

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  },
  favoriteGenre: {
    type: String,
    required: true
  },
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject._v
  }
})

export default mongoose.model('User', schema)