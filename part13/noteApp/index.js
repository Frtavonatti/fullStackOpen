import 'dotenv/config'
import { Sequelize, Model, DataTypes} from 'sequelize'
import express from 'express'

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { // Option to detect if is necessary to use SSL
      require: true,
      rejectUnauthorized: false
    } : false
  },
})

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true, // column names use snake_case (e.g., created_at instead of createdAt). Tablenames are the model name in plural (Note -> notes)
    timestamps: false, // disables automatic createdAt and updatedAt fields
    modelName: 'note', // sets the model name for sequelize
  }
)

Note.sync()

// Routes
app.get('/api/notes', async (req, res) => {
  try {
    // const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
    const notes = await Note.findAll()
    return res.json(notes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id)
    return res.json(note)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/notes', async (req, res) => {
  try {
    const newNote = await Note.create(req.body)
    return res.json(newNote)
  } catch (error) {
    return res.status(400).json({error})
  }
})

app.delete('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id)
    if (!note)
      return res.status(404).json({ error: 'Note not found' })
    note.destroy()
    return res.json({ message: 'Note deleted successfully' })
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// Config
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})