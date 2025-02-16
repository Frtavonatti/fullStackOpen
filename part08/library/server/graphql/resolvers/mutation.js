import jwt from 'jsonwebtoken'
import User from '../../models/user.js'
import Book from '../../models/book.js'
import Author from '../../models/author.js'
import errorHandler from '../../middleware/errorHandler.js'
import { GraphQLError } from 'graphql'

const mutation = {
  addBook: async (root, args, context) => errorHandler(async () => {
    let author = await Author.findOne({ name: args.author })
    const currentUser = context.currentUser

    if (!currentUser) {
      throw new GraphQLError('Not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      })
    }
    
    if (!author) {
      author = new Author({ name: args.author })
      await author.save()
    }
    
    const book = new Book({ 
      ...args, 
      author: author._id 
    })

    await book.populate('author', 'name') // Populate allows a return query of name

    return await book.save()
  }, root, args),

  addAuthor: async (root, args) => errorHandler(async () => {
    const author = new Author({ ...args })
    return await author.save()
  }, root, args),

  editAuthor: async (root, args, context) => errorHandler(async () => {
    const author = await Author.findOne({ name: args.name })
    const currentUser = context.currentUser

    if (!currentUser) {
      throw new GraphQLError('Not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      })
    }
    
    if (!author) {
      throw new GraphQLError('Author not found', {
        extensions: {
          code: 'NOT_FOUND'
        }
      })
    }
    author.born = args.setBornTo
    return await author.save()
  }, root, args),

  createUser: async (root, args) => {
    const user = new User({ ...args })
    return await user.save()
  },

  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })    

    if (!user || args.password !== user.password) {
      throw new GraphQLError('Wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }
    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  }
}

export default mutation