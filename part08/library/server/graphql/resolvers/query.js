import Book from '../../models/book.js'
import Author from '../../models/author.js'

const query = {
  bookCount: () => Book.collection.countDocuments(),
  authorCount: () => Author.collection.countDocuments(),
  allBooks: async (root, args) => {
    let query = {}
    
    if (args?.genre) {
      query.genres = { $in: [args.genre] }
    }
    
    if (args?.author) {
      const author = await Author.findOne({ name: args.author })
      if (author) {
        query.author = author._id
      }
    }
    return await Book.find(query).populate('author')
  },
  allAuthors: async () => await Author.find({}),
  me: (root, args, context) => context.currentUser
}

export default query