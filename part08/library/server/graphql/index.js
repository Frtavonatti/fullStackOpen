import query from './resolvers/query.js'
import mutation from './resolvers/mutation.js'
import { books } from '../data.js'

const resolvers = {
  Query: query,
  Author: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: mutation
}

export default resolvers