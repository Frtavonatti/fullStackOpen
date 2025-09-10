import { Router } from "express";

import { User } from '../models/index.js';
import { includeNotes } from "../utils/queries.js";

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll(includeNotes);
  res.json(users);
})

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id, includeNotes);
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