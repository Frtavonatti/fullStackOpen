import { Router } from "express"

import { Blog } from "../models/index.js"
import { tokenExtractor, sessionValidator, blogFinder, userFinder } from "../utils/middleware.js"
import { blogQueryOptions } from "../utils/queries.js"

const router = Router()


router.get('/', async (req, res) => {
  const blogs = await Blog.findAll(blogQueryOptions(req))
  return res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  return res.json(req.blog)
})

router.post('/', [tokenExtractor, sessionValidator, userFinder], async (req, res) => {
  req.body.userId = req.user.id

  if (req.body.year > new Date().getFullYear() || req.body.year < 1991) {
    const error = new Error('The year must be between 1991 and the current year');
    error.name = 'YearValidationError';
    throw error;
  }

  const newBlog = await Blog.create(req.body)
  return res.status(201).json(newBlog)
})

router.put('/:id', blogFinder, async (req, res) => {
  const updatedBlog = await req.blog.update({ likes: req.body.likes })
  return res.status(200).json(updatedBlog)
})

router.delete('/:id', [tokenExtractor, sessionValidator, userFinder, blogFinder], async (req, res) => {
  if (req.user.id !== req.blog.userId) {
    const error = new Error('You are not authorized to delete this blog')
    error.name = 'ForbiddenError'
    throw error
  }

  await req.blog.destroy()
  return res.status(200).json({ message: 'Blog deleted successfully' })
})

export default router