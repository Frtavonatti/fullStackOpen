import { Op } from "sequelize"
import { User, Note } from "../models/index.js"

// Options to include associated notes when fetching users
export const includeUser = {
  attributes: { exclude: ['userId'] },
  include: {
    model: User,
    attributes: ['username']
  }
}

export const notesQueryOptions = (req) => {
  const where = {}

  if (req.query.important !== undefined) {
    where.important = req.query.important === "true"
  }

  if (req.query.search !== undefined) {
    where.content = { 
      [Op.substring]: req.query.search // computed property: equivalent to LIKE on SQL
    }
  }

  return {
    include: {
      model: User,
      attributes: ['username']
    },
    where
  }
}

// Options to include associated notes when fetching users
export const includeNotes = {
  include: {
    model: Note,
    attributes: { exclude: ['userId'] }
  }
}