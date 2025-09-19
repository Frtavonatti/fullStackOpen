import { Op } from "sequelize"
import { User, Note, Team } from "../models/index.js"

export const includeUser = {
  attributes: { exclude: ['user_id'] },
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
      attributes: ['username'],
      // required: false,
    },
    attributes: { exclude: ['user_id'] },
    where,
    // raw: true,
    // nest: false
  }
}


export const allUsersQueryOptions = {
  include: [
    {
      model: Note,
      attributes: { exclude: ['user_id'] }
    },
    {
      model: Team,
      attributes: ['name', 'id'],
      through: { // omits attributes from the join table in many-to-many relationships
        attributes: []
      }
    }
  ]
}

export const oneUsersQueryOptions = {
  include: [
    {
      model: Note,
      attributes: { exclude: ['user_id'] }
    },
    {
      model: Note,
      as: 'marked_notes',
      attributes: { exclude: ['user_id'] },
      through: { attributes: [] },
      include: [{
        model: User,
        attributes: ['name']
      }]
    },
    {
      model: Team,
      attributes: ['name', 'id'],
      through: {
        attributes: []
      }
    }
  ]
}