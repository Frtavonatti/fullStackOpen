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

  type User {
    username: String!
    favoriteGenre: String!
    # id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author],
    me: User
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

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

export default typeDefs