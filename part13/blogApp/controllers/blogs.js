import { Router } from "express"

import { Blog, User } from "../models/index.js"
import { tokenExtractor, blogFinder } from "../utils/middleware.js"

const router = Router()

router.get('/', async (req, res, next) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res, next) => {
  return res.json(req.blog)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }

  req.body.userId = user.id
  const newBlog = await Blog.create(req.body)
  return res.json(newBlog)
})

router.put('/:id', blogFinder, async (req, res, next) => {
  const updatedBlog = await req.blog.update({ likes: req.body.likes })
  return res.status(200).json(updatedBlog)
})

router.delete('/:id', [tokenExtractor, blogFinder], async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  } else if (user.id !== req.blog.userId) {
    return res.status(403).json({ error: 'You are not authorized to delete this blog' })
  }

  await req.blog.destroy()
  return res.status(200).json({ message: 'Blog deleted successfully' })
})

export default router