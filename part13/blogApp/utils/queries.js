import { Op, fn, col } from "sequelize"
import { User, Blog } from "../models/index.js"

export const includeBlogs = {
  include: { 
    model: Blog, 
    attributes: ['author', 'title']
  }
}

export const getOneUserOptions = (req) => {
  const throughWhere = {}

  if (req.query.read !== undefined) {
    if (req.query.read === 'true') {
      throughWhere.read = true
    } else if (req.query.read === 'false') {
      throughWhere.read = false
    }
  }

  return {
    attributes: ['name', 'username'],
      include: [{
      model: Blog,
      as: 'readings',
      attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
      through: { 
        attributes: ['id', 'read'], 
        where: throughWhere,
      }
    }]
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

  if (req.query.search !== undefined) {
    // [Op.or] creates a property with a symbol key to combine multiple conditions in an array
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } }, // iLike is case-insensitive
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }
  
  return {
    include: {
      model: User,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      }
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  }
}

/**
 * Query options for retrieving aggregated author statistics.
 * @type {Object}
 * @property {Array} attributes - The fields to select:
 *   - 'author': The author's name or identifier.
 *   - [fn('COUNT', col('id')), 'articles']: Uses the Sequelize `fn` function to count the number of articles per author. The second parameter, 'articles', is the alias for the resulting column.
 *   - [fn('SUM', col('likes')), 'likes']: Uses the Sequelize `fn` function to sum the total likes per author. The second parameter, 'likes', is the alias for the resulting column.
 * @property {string|string[]} group - Groups the results by the 'author' field.
 *
 * ---
 * About the `fn` parameters:
 * @param {string} functionName - The name of the SQL function to execute (e.g., 'COUNT', 'SUM').
 * @param {...any} args - The arguments passed to the SQL function, such as specific columns (e.g., col('id'), col('likes')).
 * The second parameter in the array (e.g., 'articles', 'likes') is the alias for the computed column in the result set.
 */

export const authorsQueryOptions = {
  attributes: [ // 
    'author',
    [fn('COUNT', col('id')), 'articles'], // 
    [fn('SUM', col('likes')), 'likes']
  ],
  group: 'author',
  order: [
    ['likes', 'DESC']
  ]
}