const typeDefs = `#graphql
  type Author {
    name: String!,
    born: Int,
    bookCount: Int
  },

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String],
  },

  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author]
  },

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

    addAuthor(
      name: String!,
      born: Int
    ): Author
  }
`

export default typeDefs