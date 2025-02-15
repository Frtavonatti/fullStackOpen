import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import 'dotenv/config'
import resolvers from './graphql/index.js'
import typeDefs from './graphql/typeDefs.js'

console.log('Connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI).then(() => {
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})