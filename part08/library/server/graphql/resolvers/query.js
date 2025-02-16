import Book from '../../models/book.js'
import Author from '../../models/author.js'

const query = {
  bookCount: () => Book.collection.countDocuments(),
  authorCount: () => Author.collection.countDocuments(),
  allBooks: async (root, args) => {
    if (!args.author && !args.genre) {
      return await Book.find({})
    } else if (args.genre) {
      return await Book.find({ genres: { $in: [args.genre] } })
    
    // Pending to fix
    } else if (args.author) {
      return await Book.find({ author: args.author })
    }
  },
  allAuthors: async () => await Author.find({}),

  // Fix
  me: (root, args, context) => context.currentUser
}

export default query