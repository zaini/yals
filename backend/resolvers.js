const { gql } = require("apollo-server-express");
const Link = require("./models/Link");
const shortid = require('shortid');
require("dotenv").config();

const domain = process.env.DOMAIN;

// Writing what each function actually returns. This should be from mongoDB
const resolvers = {
  Query: {
    links: () => Link.find(),
    link: (_, { Short_URL }) => Link.find({ Short_URL: Short_URL }),
  },
  Mutation: {
    // First argument is parent, which we don't need. Second parameter is the arguments, so we destructure for what we want.
    createLink: (_, { Base_URL }) => {
      const link = new Link({
        Base_URL: Base_URL,
        Short_URL: domain + shortid.generate(),
      });
      return link.save();
    },
  },
};

module.exports = resolvers;
