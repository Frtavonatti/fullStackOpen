import { Router } from "express";

import { User } from '../models/index.js';
import { tokenExtractor, isAdmin } from "../utils/middleware.js";
import { allUsersQueryOptions, oneUsersQueryOptions } from "../utils/queries.js";

const router = Router();


router.get('/', async (_req, res) => {
  const users = await User.findAll(allUsersQueryOptions);
  res.json(users);
})

router.get('/admin', async (_req, res) => {
  const users = await User.scope('admin').findAll();
  res.json(users);
})

router.get('/disabled', async (_req, res) => {
  const users = await User.scope('disabled').findAll();
  res.json(users);
})

router.get('/username/:username', async (req, res) => {
  const users = await User.scope({ method: ['username', `%${req.params.username}%`] }).findAll();
  res.json(users);
})

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id, oneUsersQueryOptions);

  if (!user) {
    res.status(404).end();
  }

  let teams = undefined
  if ('teams' in req.query) {
    teams = await user.getTeams({ // Lazy fetch
      attributes: ['name'],
      joinTableAttributes: [],
    })
  }

  res.json({ ...user.toJSON(), teams })
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