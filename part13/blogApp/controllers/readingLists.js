import { Router } from "express";

import { Reading_List } from "../models/index.js";
import { tokenExtractor, sessionValidator } from "../utils/middleware.js";

const readingListRouter = Router()

readingListRouter.get('/', async (_req, res) => {
  const readinglists = await Reading_List.findAll()
  res.json(readinglists) 
}) 

readingListRouter.post('/', async (req, res) => {
  const { blogId, userId, read } = req.body
  const readinglists = await Reading_List.create({
    userId,
    blogId,
    read: read ?? false 
  })
  res.json(readinglists) 
}) 

readingListRouter.put('/:id', tokenExtractor, sessionValidator, async (req, res) => {
  const readingList = await Reading_List.findByPk(req.params.id)
  if (req.body.read !== readingList.read) {
    const updatedReadingList = await readingList.update({ read: req.body.read })
    res.status(200).json(updatedReadingList)
  } else {
    const error = new Error()
    error.name = "NoChangeError"
    throw error
  }
})

export default readingListRouter