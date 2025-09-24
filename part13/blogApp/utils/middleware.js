import jwt from "jsonwebtoken"
import { Blog, User, Session } from "../models/index.js"
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
      req.token = authorization.substring(7)
      next()
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
}

export const sessionValidator = async (req, res, next) => {
  const session = await Session.findOne({ 
    where: {
      token: req.token,
    }
  })

  if (!session) {
    return res.status(404).json({ error: 'session not found' })
  } else if (!session.active) {
    return res.status(401).json({ error: 'session is inactive' })
  }

  const user = await User.findByPk(session.userId)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  if (user.disabled) {
    await session.update({ active: false })
    return res.status(401).json({ error: 'user is disabled' })
  }

  req.user = user
  req.session = session
  next()
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