const { gql } = require("apollo-server-express");
const Link = require("./models/Link");
const { nanoid } = require("nanoid");
const argon2 = require("argon2");
const User = require("./models/User");

// Writing what each function actually returns. This should be from mongoDB
const resolvers = {
  Query: {
    links: () => Link.find(),
    link_by_short_url: (_, { Short_URL }) =>
      Link.findOne({ Short_URL: Short_URL }),
    link_by_base_url: (_, { Base_URL }) => Link.find({ Base_URL: Base_URL }),
    users: () => User.find(),
    me: async (_, __, { req }) => {
      // not logged in
      if (req.session.userID === null) {
        return null;
      }
      const user = await User.findOne({ _id: req.session.userID });
      return user;
    },
    my_links: async (_, __, { req }) => {
      // not logged in
      if (req.session.userID === null) {
        return null;
      }
      const links = await Link.find({ Created_By: req.session.userID });
      return links;
    },
  },
  Mutation: {
    // First argument is parent, which we don't need. Second parameter is the arguments, so we destructure for what we want.
    createLink: (_, { Created_By, Expires_At, Base_URL }) => {
      let expiry_date = Expires_At === undefined ? null : new Date(Expires_At);
      const link = new Link({
        Created_By: Created_By,
        Created_At: new Date(),
        Expires_At: expiry_date,
        Base_URL: Base_URL,
        Short_URL: nanoid(7),
      });
      link.save();
      return link;
    },
    registerUser: async (_, user_details, { req }) => {
      if (user_details.Email.length <= 6) {
        return {
          errors: [{ field: "email", message: "that email is too short" }],
        };
      }

      if (user_details.UserName.length <= 5) {
        return {
          errors: [
            { field: "username", message: "that username is too short" },
          ],
        };
      }

      if (user_details.Password.length <= 7) {
        return {
          errors: [
            { field: "password", message: "that password is too short" },
          ],
        };
      }

      const existingUser = await User.findOne({ Email: user_details.Email });
      if (existingUser !== null) {
        return {
          errors: [{ field: "email", message: "that email already exists" }],
        };
      }

      const hashedPassword = await argon2.hash(user_details.Password);
      const user = new User({
        Created_At: new Date(),
        Email: user_details.Email,
        UserName: user_details.UserName,
        Password: hashedPassword,
      });
      user.save();
      req.session.userID = user.id; // storing the users id in the cookie session, essentially logging them in
      return { user: user };
    },
    login: async (_, user_details, { req }) => {
      // Could use a validation library instead of these if statements for checking length
      if (user_details.Email.length <= 6) {
        return {
          errors: [{ field: "email", message: "that email is too short" }],
        };
      }

      if (user_details.Password.length <= 7) {
        return {
          errors: [
            { field: "password", message: "that password is too short" },
          ],
        };
      }

      const user = await User.findOne({ Email: user_details.Email });
      if (user === null) {
        return {
          errors: [{ field: "email", message: "that email doesn't exist" }],
        };
      }
      const validPassword = await argon2.verify(
        user.Password,
        user_details.Password
      );
      if (!validPassword) {
        return {
          errors: [
            { field: "password", message: "that password is incorrect" },
          ],
        };
      }

      req.session.userID = user.id;

      return {
        user: user,
      };
    },
    logout: async (_, __, { req, res }) => {
      return new Promise((resolve) =>
        req.session.destroy((err) => {
          res.clearCookie("qid");
          if (err) {
            console.log(err);
            resolve(false);
            return;
          }
          resolve(true);
        })
      );
    },
  },
};

module.exports = resolvers;
