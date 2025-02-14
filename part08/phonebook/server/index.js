import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import 'dotenv/config'

import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/index.js'

// Mongoose Config
mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// Apollo Server Config
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  // The object returned by the context is given to all resolvers as their third parameter.
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)   
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }    
    }  
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})