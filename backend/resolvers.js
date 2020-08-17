const { gql } = require("apollo-server-express");
const Link = require("./models/Link");
const shortid = require("shortid");
require("dotenv").config();

const domain = process.env.DOMAIN;

// Writing what each function actually returns. This should be from mongoDB
const resolvers = {
  Query: {
    links: () => Link.find(),
    link_by_short_url: (_, { Short_URL }) => Link.find({ Short_URL: Short_URL }),
    link_by_base_url: (_, { Base_URL }) => Link.find({ Base_URL: Base_URL }),
  },
  Mutation: {
    // First argument is parent, which we don't need. Second parameter is the arguments, so we destructure for what we want.
    createLink: (_, { Base_URL }) => {
      Link.findOne({ Base_URL: Base_URL }, (err, res) => {
        if (res == null) {
          // If a Link doesn't exists for the given URL, create and return a Link
          console.log(`${Base_URL} does not exist. Creating and returning a new Link.`);
          const link = new Link({
            Base_URL: Base_URL,
            Short_URL: domain + shortid.generate(),
          });
          return link.save();
        } else {
          // If a Link already exists for the given URL, return that Link
          console.log(`${Base_URL} does exist. Returning ${res}.`);
          return res;
        }
      });
    },
  },
};

module.exports = resolvers;
