const { gql } = require('apollo-server-express');

// Defining the types of requests, like GET, PUT, POST and what type they return.
const typeDefs = gql`
    type Query {
        links: [Link]!
        link(Short_URL: String!): [Link]
    }
    type Link {
        id: ID!
        Base_URL: String!
        Short_URL: String!
        Expired: Boolean!
        Expiry_Date: String
    }
    type Mutation {
        createLink(Base_URL: String!, Short_URL: String, Expiry_Date: String): Link!
    }
`;

module.exports = typeDefs;