const { gql } = require("apollo-server-express");

// Defining the types of requests, like GET, PUT, POST and what type they return.
const typeDefs = gql`
  type Link {
    id: ID!
    Created_By: String
    Created_At: String!
    Expires_At: String
    Base_URL: String!
    Short_URL: String!
  }
  type User {
    id: ID!
    Created_At: String!
    Email: String!
    UserName: String!
  }
  type Message {
    id: ID!
    Sent_At: String
    Name: String!
    Email: String!
    Subject: String!
  }
  type UserResponse {
    errors: [FieldError]
    user: User
  }
  type MessageResponse {
    errors: [FieldError]
    message: Message
  }
  type FieldError {
    field: String
    message: String
  }
  type Query {
    links: [Link]!
    link_by_short_url(Short_URL: String!, Expires_At: Float): Link # having to use float because BigInt isn't a thing
    link_by_base_url(Base_URL: String!): [Link]
    users: [User]!
    me: User
    my_links: [Link]!
  }
  type Mutation {
    createLink(
      Created_By: String
      Expires_At: String
      Base_URL: String!
      Short_ID: String
    ): Link!
    editLink(ID: String!, New_Expiry: String!): Link!
    deleteLink(ID: String): Link
    registerUser(
      Email: String!
      UserName: String!
      Password: String!
    ): UserResponse!
    login(Email: String!, Password: String!): UserResponse!
    logout: Boolean!
    createMessage(
      Name: String
      Email: String
      Subject: String
      Message: String
    ): MessageResponse!
  }
`;

module.exports = typeDefs;
