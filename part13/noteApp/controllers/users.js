import { Router } from "express";

import { User } from '../models/index.js';
import { tokenExtractor, isAdmin } from "../utils/middleware.js";
import { allUsersQueryOptions, oneUsersQueryOptions } from "../utils/queries.js";

const router = Router();


router.get('/', async (req, res) => {
  const users = await User.findAll(allUsersQueryOptions);
  res.json(users);
})

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id, oneUsersQueryOptions);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
})

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({ 
    where: { username: req.params.username }
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  } else if (user.disabled === req.body.disabled) {
    return res.status(200).json(user)
  }

  user.disabled = req.body.disabled
  await user.save()
  return res.status(200).json(user)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
})

export default router;