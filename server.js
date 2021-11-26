const { ApolloServer, gql } = require("apollo-server")

const users = [
    {
        id: 1,
      firstName: "GraphQL",
      lastName: "isCool",
      email: "graphql@isCool.com"
    },
    {
        id:2,
      firstName: "nodejs",
      lastName: "isCool",
      email: "nodejs@isCool.com"
    },
    {
        id: 3,
      firstName: "appolo-server",
      lastName: "isCool",
      email: "appolo@isCool.com"
    }
  ];


const typeDefs = gql`
    type User {
        id : Int!
        firstName : String!,
        lastName : String!,
        email : String!,
    }

    type UserM {
        firstName : String!,
        lastName : String!,
        email : String!,
    }

    type Query {
        hello: String!
        id : Int!
        queryUsers : [User]!          
        findUser(id: Int!) : User!    
    }

    type Mutation {
      addUser(firstName: String!, lastName : String!, email: String!): UserM!
    }
`

const resolvers = {
    Query : {
        hello : ()=> "Hello World!",
        id : () => Math.round(Math.random()*10),
        queryUsers : ()=> users,
        findUser : (parent, args)=>{
          const user = users.find(user => user.id === args.id);
          return user
        }
    },

    Mutation : {
      addUser : (parent, args) =>{
        const user = {id: users.length+1, firstName : args.firstName, lastName:args.lastName, email:args.email}
        users.push(user)
        return user
      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen({port: 3000}).then(({url}) => console.log(`Server is running at ${url}`))
