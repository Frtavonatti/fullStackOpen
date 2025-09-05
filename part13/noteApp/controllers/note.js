import { Router } from "express"

import Note from '../models/note.js'

const router = Router()

// Middleware
const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
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

router.post('/', async (req, res) => {
  try {
    const newNote = await Note.create(req.body)
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