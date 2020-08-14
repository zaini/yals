const { gql } = require('apollo-server-express');
const Link = require('./models/Link');

// Writing what each function actually returns. This should be from mongoDB
const resolvers = {
    Query: {
        links: () => Link.find(),
        link: (_, { Short_URL }) =>  Link.find({ Short_URL: Short_URL })
    },
    Mutation: {
        // First argument is parent, which we don't need. Second parameter is the arguments, so we destructure for what we want.
        createLink: (_, { Base_URL, Short_URL, Expiry_Date }) => {
            let date = Expiry_Date || new Date();
            const link = new Link({
                Base_URL: Base_URL,
                Short_URL: Short_URL || base_convert(time(), 10, 36),
                Expired: false,
                Expiry_Date: date.toString()
            });
            return link.save();
        }
    }
};

module.exports = resolvers;