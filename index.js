import { ApolloServer, gql  } from 'apollo-server'
import { createPokemon, searchPokemon, createReport, seeAllReports, deletePokemon, 
    deleteReport, numberOfPokemon } from './databaseHandlers/resolverHelper.js'

import {} from 'dotenv/config'

const ADMIN_KEY = process.env.ADMIN_KEY

const typeDefs = gql`
type Pokemon {
    id: Int!
    name: String!
    hp: Int!
    attack: Int!
    defense: Int!
    type1: String!
    type2: String
    ability1: String!
    ability2: String
    speed: Int!
    spatk: Int!
    spdef: Int!
    description: String
    height: String!
    weight: String!
    image: String!
}

type Report {
    pokemonReported: String!
    reportDescription: String!
    id: ID!
}

type Query {
    search(
        name: String
        hpLowerBound: Int
        hpUpperBound: Int
        attackLowerBound: Int
        attackUpperBound: Int
        defenseLowerBound: Int
        defenseUpperBound: Int
        type1: String
        type2: String
        ability1: String
        ability2: String
        speedLowerBound: Int
        speedUpperBound: Int
        spatkLowerBound: Int
        spatkUpperBound: Int
        spdefLowerBound: Int
        spdefUpperBound: Int
        indexLowerBound: Int
        indexUpperBound: Int
    ): [Pokemon]

    numOfPokemon: Int!

    seeReports: [Report]

    login: Boolean
}

type Mutation {
    addPokemon(
        name: String!
        hp: Int!
        attack: Int!
        defense: Int!
        type1: String!
        type2: String
        ability1: String!
        ability2: String
        speed: Int!
        spatk: Int!
        spdef: Int!
        description: String
        height: String!
        weight: String!
        image: String!
    ): Pokemon

    addReport(
        pokemonReported: String!
        reportDescription: String!
    ): String

    removePokemon(
        name: String!
    ): String

    removeReport(
        id: ID!
    ): String
}
`

const resolvers = {
    Query: {
        search: (root,args) => {
            return searchPokemon(args)
        },
        numOfPokemon: (root) => {
            return numberOfPokemon()
        },
        seeReports: (parent,root,context) => {
            if (context.admin != true) {
                return new Error("Only an administrator may view the reports.")
            }
            return seeAllReports()
        },
        login: (parent, root, context) => {
            return (
                context.admin
            )
        }
    },
    Mutation: {
        addPokemon: (root,args) => { 
            return createPokemon(args)
        },
        addReport: (root, args) => {
            return createReport(args)
        },
        removePokemon: (parent,args,context) => {
            if (context.admin != true) {
                return new Error("Only an administrator may remove a pokemon.")
            }
            return deletePokemon(args)
        },
        removeReport: (parent,args,context) => {
            if (context.admin != true) {
                return new Error("Only an administrator may remove a report.")
            }
            return deleteReport(args)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        if (req.headers.authorization === ADMIN_KEY) { // basic authorization with context object; admin key in .env file is the password to access certain mutations/queries.
            return { admin: true }
        }
        return { admin: false }

    }
  })

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

  