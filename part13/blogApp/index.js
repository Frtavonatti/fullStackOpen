import 'dotenv/config'
import { Sequelize, Model, DataTypes } from 'sequelize'
import express from 'express'

const app = express()
app.use(express.json())

// DB Connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { // Option to detect if is necessary to use SSL
      require: true,
      rejectUnauthorized: false
    } : false
  },
})

// Model
class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

Blog.sync()

// Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    return res.json(blogs)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) 
      return res.status(404).end()
    return res.json(blog)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)
    return res.json(newBlog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog)
      return res.status(404).json({ error: 'Blog not found' })
    const updatedBlog = await blog.update({ likes: req.body.likes })
    return res.status(200).json(updatedBlog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) 
      return res.status(404).json({ error: 'Blog not found' })
    await blog.destroy()
    return res.status(200).json({ message: 'Blog deleted successfully' })
  } catch (error) {
    return res.status(400).json({ error }) 
  }
})

// Config
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})