import { Op } from "sequelize"
import { User, Note, Team } from "../models/index.js"

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

/**
 * Options for querying a user with associated Notes and Teams.
 * Includes related Note and Team models, excluding 'userId' from Notes and selecting only 'name' and 'id' from Teams.
 * The 'through' option is important because it omits attributes from the join table in many-to-many relationships.
 */
export const userQueryOptions = {
  include: {
    model: Note,
    attributes: { exclude: ['userId'] }
  },
  include: {
    model: Team,
    attributes: ['name', 'id'],
    through: { 
      attributes: []
    }
  }
}