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