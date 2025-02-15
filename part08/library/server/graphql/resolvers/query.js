import { books, authors } from "../../data.js"

const query = {
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
}

export default query