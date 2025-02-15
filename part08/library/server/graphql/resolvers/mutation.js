import Book from '../../models/book.js'
import Author from '../../models/author.js'

const mutation = {
  addBook: async (root, args) => {
    try {
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
    } catch (error) {
      throw new Error(error.message)
    }
  },

  addAuthor: async (root, args) => {
    const author = new Author({ ...args })
    return await author.save()
  },

  editAuthor: async (root, args) => {
    const author = await Author.findOne({ name: args.name })
    if (!author) {
      return null
    }
    author.born = args.setBornTo
    return await author.save()
  }
} 

export default mutation