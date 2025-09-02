import 'dotenv/config'
import { Sequelize, Model, DataTypes, QueryTypes} from 'sequelize' // Delete querytypes
import express from 'express'
const app = express()

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

// Routes
app.get('/api/notes', async (req, res) => {
  // const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll()
  res.json(notes)
})

app.post('api/notes', async (req, res) => {
  // console.log(req.body)
  try {
    const newNote = await Note.create(req.body)
    res.json(newNote)
  } catch (error) {
    return res.status(400).json({error})
  }
})

// Config
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})