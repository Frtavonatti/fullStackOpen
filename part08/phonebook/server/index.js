import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import { v1 as uuid } from 'uuid'
import gql from 'graphql-tag'

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

const typeDefs = gql`
  enum YesNo {  
    YES  
    NO
  }

  type Address {  
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(    
      name: String!    
      phone: String!  
    ): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }
      const byPhone = (person) => 
        args.phone === 'YES' ? person.phone : !person.phone
      return persons.filter(byPhone)
    },
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },
  Person: {
    address: (root) =>  {
      return {
        city: root.city,
        street: root.street,
      }
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args.name
          }
        })
      }
      
      const person = {...args, id: uuid() } 
      persons.push(person)
      return person
    },
    editNumber: (root, args) => {
      const findPerson = persons.find(p => p.name === args.name)
      if (!findPerson) {
        return null
      }
      const updatedPerson = {
        ...findPerson,
          phone: args.phone
      }
      // persons.map(p => p.name === args.name ? updatedPerson : p)
      persons = persons.map(p => (p.name === args.name ? updatedPerson : p)); // Assign the result of map back to persons
      return updatedPerson
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})