import query from './resolvers/query.js'
import mutation from './resolvers/mutation.js'

const resolvers = {
  Query: query,
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    },
  },
  Mutation: mutation
}

export default resolvers
