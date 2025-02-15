const typeDefs = `#graphql
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
  type Mutation {
    addBook(
    title: String!,
    published: Int!,
    author: String!,
    genres: [String],
    ): Books,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Authors
  }
`

export default typeDefs