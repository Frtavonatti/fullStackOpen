import { Router } from "express"

import Blog from "../models/blog.js"

const router = Router()

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) 
    return res.status(404).json({ error: 'Blog not found' })
  next()
}

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    return res.json(blogs)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.get('/:id', blogFinder, async (req, res) => {
  try {
    return res.json(req.blog)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)
    return res.json(newBlog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  try {
    const updatedBlog = await req.blog.update({ likes: req.body.likes })
    return res.status(200).json(updatedBlog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    await req.blog.destroy()
    return res.status(200).json({ message: 'Blog deleted successfully' })
  } catch (error) {
    return res.status(400).json({ error }) 
  }
})

export default router