import { Router } from "express";

import { User, Note } from '../models/index.js';

const router = Router();

// Options to include associated notes when fetching users
const config = {
  include: {
    model: Note,
    attributes: { exclude: ['userId'] }
  }
}

// Routes
router.get('/', async (req, res) => {
  const users = await User.findAll(config);
  res.json(users);
})

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id, config);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
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