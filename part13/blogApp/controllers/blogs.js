import { Router } from "express"

import { Blog } from "../models/index.js"
import { tokenExtractor, blogFinder, userFinder } from "../utils/middleware.js"
import { includeUser } from "../utils/queries.js"

const router = Router()

router.get('/', async (req, res, next) => {
  const blogs = await Blog.findAll(includeUser)
  return res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res, next) => {
  return res.json(req.blog)
})

router.post('/', [tokenExtractor, userFinder], async (req, res, next) => {
  req.body.userId = req.user.id // Find out where is req.body.userId used after blog creation
  const newBlog = await Blog.create(req.body)
  return res.status(201).json(newBlog)
})

router.put('/:id', blogFinder, async (req, res, next) => {
  const updatedBlog = await req.blog.update({ likes: req.body.likes })
  return res.status(200).json(updatedBlog)
})

router.delete('/:id', [tokenExtractor, userFinder, blogFinder], async (req, res, next) => {
  if (req.user.id !== req.blog.userId) {
    const error = new Error('You are not authorized to delete this blog')
    error.name = 'ForbiddenError'
    throw error
  }

  await req.blog.destroy()
  return res.status(200).json({ message: 'Blog deleted successfully' })
})

export default router