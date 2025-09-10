import { User, Note } from "../models/index.js"

// Options to include associated notes when fetching users
export const includeUser = {
  attributes: { exclude: ['userId'] },
  include: {
    model: User,
    attributes: ['username']
  }
}

// Options to include associated notes when fetching users
export const includeNotes = {
  include: {
    model: Note,
    attributes: { exclude: ['userId'] }
  }
}