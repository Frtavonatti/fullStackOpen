import Blog from "../models/blog.js"

export const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ name: error.name, message: error.message })
  } else if (error.name === 'NotFoundError') {
    return res.status(404).json({ name: error.name, message: error.message })
  }if (error.name === 'NotFoundError') {
    return res.status(404).json({ error: error.message })
  }

  return res.status(500).json({ error: 'Internal server error' })
}

export const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) 
  if (!req.blog) {
    const error = new Error('Blog not found')
    error.name = 'NotFoundError'
    return next(error)
  }
  next()
}