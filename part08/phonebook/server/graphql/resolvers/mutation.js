import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import Person from '../../models/person.js'
import User from '../../models/user.js'

const mutation = {
  addPerson: async (root, args, context) => {
    const person = new Person({ ...args })
    const currentUser = context.currentUser

    if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
    }

    try {
      await person.save()
      currentUser.friends = currentUser.friends.concat(person)
      await currentUser.save()
    } catch (error) {
      throw new GraphQLError('Saving user failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.name,
          error
        }
      })
    }
    return person
  },

  addAsFriend: async (root, args, { currentUser }) => {
    const isFriend = (person) =>
      currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())

    if (!currentUser) {
      throw new GraphQLError('wrong credentials', {
        extensions: 'BAD_USER_INPUT'
      })
    }

    const person = await Person.findOne({ name: args.name })
    if (!isFriend(person)) {
      currentUser.friends = currentUser.friends.concat(person) 
    }

    await currentUser.save()

    return currentUser
  },

  editNumber: async (root, args) => {
    const person = await Person.findOne({ name: args.name })
    person.phone = args.phone

    try {
      await person.save()
    } catch (error) {
      throw new Error(error.message, {
        invalidArgs: args,
      })
    }
    return person
  },

  createUser: async (root, args) => {
    const user = new User({ username: args.username })

    return user.save()
      .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
  },

  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })        
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  },
}

export default mutation