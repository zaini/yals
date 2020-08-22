const { gql } = require("apollo-server-express");

// Defining the types of requests, like GET, PUT, POST and what type they return.
const typeDefs = gql`
  type Link {
    id: ID!
    Base_URL: String!
    Short_URL: String!
  }
  type User {
    id: ID!
    Created_At: String!
    Email: String!
    UserName: String!
  }
  type UserResponse {
    errors: [FieldError]
    user: User
  }
  type FieldError {
    field: String
    message: String
  }
  type Query {
    links: [Link]!
    link_by_short_url(Short_URL: String!): Link
    link_by_base_url(Base_URL: String!): [Link]
    users: [User]!
    me: User
  }
  type Mutation {
    createLink(Base_URL: String!): Link!
    registerUser(Email: String!, UserName: String!, Password: String!): User!
    login(Email: String!, Password: String!): UserResponse!
  }
`;

module.exports = typeDefs;
