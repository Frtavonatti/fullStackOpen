import { Router } from "express";

import { Blog } from "../models/index.js";
import { authorsQueryOptions } from "../utils/queries.js";

const authorsRouter = Router()

authorsRouter.get('/', async (req, res) => {
  const authors = await Blog.findAll(authorsQueryOptions)
  return res.json(authors)
})

export default authorsRouter