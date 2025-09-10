import { Op } from "sequelize"
import { User, Blog } from "../models/index.js"

export const includeBlogs = {
  include: { 
    model: Blog, 
    attributes: ['author', 'title']
  }
}

export const includeUser = {
  include: {
    model: User,
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt']
    }
  }
}

export const blogQueryOptions = (req) => {
  const where = {}

  if (req.query.search != undefined) {
    where.title = { [Op.iLike]: `%${req.query.search}%` } // iLike es case-insensitive en PostgreSQL
  }

  return {
    include: {
      model: User,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      }
    },
    where
  }
}