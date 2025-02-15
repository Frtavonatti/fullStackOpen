import query from './resolvers/query.js'
import mutation from './resolvers/mutation.js'
import Book from '../models/book.js'

const resolvers = {
  Query: query,
  Author: {
    // Pending to fix
    bookCount: async (root) => {
      const result = await Book.countDocuments({ author: root._id })
      return result
    }
  },
  Mutation: mutation
}

export default resolvers