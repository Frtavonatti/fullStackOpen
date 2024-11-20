const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
 `mongodb+srv://frtavonatti:${password}@atlascluster.mwbdd5d.mongodb.net/noteApp?retryWrites=true&w=majority&appName=AtlasCluster`
  // `mongodb+srv://frtavonatti:${password}@atlascluster.mwbdd5d.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=AtlasCluster`

mongoose.set('strictQuery', false)

//Create User Template
mongoose.connect(url).then(() => {
  const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    notes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Note'
        }
    ],
})

  const User = mongoose.model('User', userSchema)

  const user = new User({
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  })

  user.save().then(() => {
    console.log('User saved')
    mongoose.connection.close()
  })

  User.find({}).then(result => {
    result.forEach(usr => {
      console.log(usr)
    })
    mongoose.connection.close()
  })

})


// Create Note Template
// mongoose.connect(url).then(() => {
//   const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
//   })

//   const Note = mongoose.model('Note', noteSchema)

//   const note = new Note({
//     content: 'Browser can execute only JavaScript',
//     important: true,
//   })

//   note.save().then(() => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })

//   Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })
// })