const typeDefs = `#graphql
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int
  }, 
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String],
  },
  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author]
  }
  type Mutation {
    addBook(
    title: String!,
    published: Int!,
    author: String!,
    genres: [String],
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

export default typeDefs