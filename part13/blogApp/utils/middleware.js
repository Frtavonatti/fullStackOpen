import jwt from "jsonwebtoken"
import { Blog, User } from "../models/index.js"
import { includeUser, includeBlogs } from "./queries.js"
import { SECRET } from "./config.js"

export const errorHandler = (error, req, res, next) => {
  console.error(error)

  const errorMap = {
    SequelizeValidationError: { status: 400, message: 'Validation failed.' },
    YearValidationError: { status: 400, message: 'Year is invalid.' },
    NoChangeError: { status: 400, message: "No changes detected: 'read' value is the same as before." },
    NotFoundError: { status: 404, message: 'Resource not found.' },
    ForbiddenError: { status: 403, message: 'Access forbidden.' },
  }

  const { status, message } = errorMap[error.name] 
  || { status: 500, message: 'Internal server error' }

  res.status(status).json({
    name: error.name || 'Error',
    message: error.message || error.customMessage || message,
  })
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