import { GraphQLError } from 'graphql'

const errorHandler = async (resolver, root, args, context, info) => {
  try {
    return await resolver(root, args, context, info)
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new GraphQLError('Validation Error: ' + error.message, {
        extensions: {
          code: 'BAD_USER_INPUT',
          error
        }
      })
    }
    throw new GraphQLError('Internal Server Error: ' + error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        error
      }
    })
  }
}

export default errorHandler