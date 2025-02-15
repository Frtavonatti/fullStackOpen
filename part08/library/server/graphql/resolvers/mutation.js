import Book from '../../models/book.js'
import Author from '../../models/author.js'
import errorHandler from '../../middleware/errorHandler.js'

const mutation = {
  addBook: async (root, args) => errorHandler(async () => {
    let author = await Author.findOne({ name: args.author })
    if (!author) {
      author = new Author({ name: args.author })
      await author.save()
    }
    
    const book = new Book({ 
      ...args, 
      author: author._id 
    })

    // Populate allows a return query of name
    await book.populate('author', 'name')

    return await book.save()
  }, root, args),

  addAuthor: async (root, args) => errorHandler(async () => {
    const author = new Author({ ...args })
    return await author.save()
  }, root, args),

  editAuthor: async (root, args) => errorHandler(async () => {
    const author = await Author.findOne({ name: args.name })
    if (!author) {
      throw new GraphQLError('Author not found', {
        extensions: {
          code: 'NOT_FOUND'
        }
      })
    }
    author.born = args.setBornTo
    return await author.save()
  }, root, args)
}

export default mutation