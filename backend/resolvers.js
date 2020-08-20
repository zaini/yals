const { gql } = require("apollo-server-express");
const Link = require("./models/Link");
const { nanoid } = require("nanoid");

// Writing what each function actually returns. This should be from mongoDB
const resolvers = {
  Query: {
    links: () => Link.find(),
    link_by_short_url: (_, { Short_URL }) =>
      Link.findOne({ Short_URL: Short_URL }),
    link_by_base_url: (_, { Base_URL }) => Link.find({ Base_URL: Base_URL }),
  },
  Mutation: {
    // First argument is parent, which we don't need. Second parameter is the arguments, so we destructure for what we want.
    createLink: (_, { Base_URL }) => {
      const link = new Link({
        Base_URL: Base_URL,
        Short_URL: nanoid(7),
      });
      link.save();
      return link;
    },
  },
};

module.exports = resolvers;
