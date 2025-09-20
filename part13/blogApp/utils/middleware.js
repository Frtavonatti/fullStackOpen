import jwt from "jsonwebtoken"
import { Blog, User } from "../models/index.js"
import { includeUser, includeBlogs } from "./queries.js"
import { SECRET } from "./config.js"

export const errorHandler = (error, req, res, next) => {
  console.error(error)

  const errorMap = {
    SequelizeValidationError: 400,
    YearValidationError: 400,
    NoChangeError: 400,
    NotFoundError: 404,
    ForbiddenError: 403,
  }

  const status = errorMap[error.name] || 500
  const message = error.message || 'Internal server error'

  res.status(status).json({
    name: error.name || 'Error',
    message,
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