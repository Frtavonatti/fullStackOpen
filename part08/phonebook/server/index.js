import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws' // Using deprecated version of graphql-ws
import express from 'express'
import cors from 'cors'
import http from 'http'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import 'dotenv/config'
import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/index.js'
import User from './models/user.js'

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

// Apollo Server Config: setup is now within a function
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({ 
    server: httpServer, 
    path: '/', 
  })
    
  const schema = makeExecutableSchema({ typeDefs, resolvers })  
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start()

  // Express Middleware Mount Point
  app.use('/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id).populate(
            'friends'
          )
          return { currentUser }
        }
      },
    }),
  )

  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()