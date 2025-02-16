import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import resolvers from './graphql/index.js'
import typeDefs from './graphql/typeDefs.js'
import User from './models/user.js'

const url = process.env.MONGODB_URI
console.log('Connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (error) {
        console.error('Error verifying token:', error)
      }
    }
    return {}
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})