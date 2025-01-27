import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { gql } from 'apollo-server'
import { books, authors } from './data.js'

const typeDefs = gql`
  type Authors {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int
  }, 
  type Books {
    title: String!,
    published: Int!,
    author: String!,
    id: ID!,
    genres: [String],
  },
  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Books],
    allAuthors: [Authors]
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books
      } else if (args.author) {
        return books.filter((book) => book.author === args.author)
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      }
    },
    allAuthors: () => authors
  },
  Authors: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})