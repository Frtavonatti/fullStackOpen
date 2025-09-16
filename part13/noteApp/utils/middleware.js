import jwt from 'jsonwebtoken'

import { Note, User} from '../models/index.js'
import { includeUser } from './queries.js'
import { SECRET } from "./config.js"

export const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id, includeUser) // Added config 
  if (!req.note) 
    return res.status(404).json({ error: 'Note not found' })
  next()
}

export const tokenExtractor = (req, res, next) => {
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

export const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}