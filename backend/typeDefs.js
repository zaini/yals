const { gql } = require("apollo-server-express");

// Defining the types of requests, like GET, PUT, POST and what type they return.
const typeDefs = gql`
  type Query {
    links: [Link]!
    link_by_short_url(Short_URL: String!): Link
    link_by_base_url(Base_URL: String!): [Link]
  }
  type Link {
    id: ID!
    Base_URL: String!
    Short_URL: String!
  }
  type Mutation {
    createLink(Base_URL: String!): Link!
  }
`;

module.exports = typeDefs;
