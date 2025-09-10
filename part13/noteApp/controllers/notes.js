import { Router } from "express"

import { Note, User } from '../models/index.js'
import { tokenExtractor, noteFinder } from '../utils/middleware.js'
import { notesQueryOptions } from "../utils/queries.js"

const router = Router()

// Routes
router.get('/', async (req, res) => {
  const notes = await Note.findAll(notesQueryOptions(req))
  return res.json(notes)
})

router.get('/:id', noteFinder, async (req, res) => {
  return res.json(req.note)
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
    return res.status(201).json(newNote)
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