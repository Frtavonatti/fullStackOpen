import { Router } from "express";

import { User } from "../models/index.js";
import { includeBlogs } from "../utils/queries.js";

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll(includeBlogs)
  return res.json(users)
})

// TODO: As the project grows, consider adding reusable middlewares to find users 
// by id and username instead of handling "User not found" directly in the controller
router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id, includeBlogs)
    if (!user) {
    const error = new Error('User not found')
    error.name = 'NotFoundError'
    return next(error)
  }
  return res.json(user)
})

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body)
  return res.status(201).json(newUser)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
    if (!user) {
    const error = new Error('User not found')
    error.name = 'NotFoundError'
    return next(error)
  }
  const updatedUser = user.update({ name: req.body.name })
  return res.status(200).json(updatedUser)
})

export default router