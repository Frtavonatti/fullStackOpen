import jwt from "jsonwebtoken"
import { Blog, User } from "../models/index.js"
import { includeUser, includeBlogs } from "./queries.js"
import { SECRET } from "./config.js"

export const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ name: error.name, message: error.message })
  } else if (error.name = 'YearValidationError') {
    return res.status(400).json({ name: error.name, message: error.message })
  } else if (error.name === 'NotFoundError') {
    return res.status(404).json({ name: error.name, message: error.message })
  } else if (error.name === 'ForbiddenError') {
    return res.status(403).json({ name: error.name, message: error.message })
  }

  return res.status(500).json({ error: 'Internal server error' })
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

export const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, includeUser)
  if (!req.blog) {
    const error = new Error('Blog not found')
    error.name = 'NotFoundError'
    return next(error)
  }
  next()
}

export const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.decodedToken.id, includeBlogs)
  if (!req.user) {
    const error = new Error('User not found')
    error.name = 'NotFoundError'
    return next(error)
  }
  next()
}