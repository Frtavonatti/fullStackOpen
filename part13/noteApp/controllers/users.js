import { Router } from "express";

import { User, Note } from '../models/index.js';

const router = Router();

// Options to include associated notes when fetching users
const options = {
  include: {
    model: Note
  }
}

// Routes
router.get('/', async (req, res) => {
  const users = await User.findAll(options);
  res.json(users);
})

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id, options);
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