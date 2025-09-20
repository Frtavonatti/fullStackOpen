import { Router } from "express";

import { Reading_List } from "../models/index.js";

const readingListRouter = Router()

readingListRouter.get('/', async (req, res) => {
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

export default readingListRouter