import jwt from 'jsonwebtoken'
import { Router } from "express"

import { Note, User } from '../models/index.js'
import { SECRET } from '../utils/config.js'

const router = Router()

// Middleware
const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  if (!req.note) 
    return res.status(404).json({ error: 'Note not found' })
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      next()
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })   
    }
  } else {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
}

// Routes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll()
    return res.json(notes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', noteFinder, async (req, res) => {
  try {
    return res.json(req.note)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', noteFinder, async (req, res) => {
  try {
    const updatedNote = await req.note.update({ important: !req.note.important })
    return res.status(200).json(updatedNote)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const newNote = await Note.create({
      ...req.body, 
      userId: user.id,
      date: new Date(),
    })
    return res.json(newNote)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', noteFinder, async (req, res) => {
  try {
    if (!req.note)
      return res.status(404).json({ error: 'Note not found' })
    await req.note.destroy()
    return res.status(204).json({ message: 'Note deleted successfully' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

export default router