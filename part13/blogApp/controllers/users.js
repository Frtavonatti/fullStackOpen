import { Router } from "express";

import { User } from "../models/index.js";

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  return res.json(user)
})

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body)
  return res.json(newUser)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  const updatedUser = user.update({ name: req.body.name })
  return res.status(200).json(updatedUser)
})

export default router