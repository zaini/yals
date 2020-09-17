const { gql } = require("apollo-server-express");
const Link = require("./models/Link");
const { nanoid } = require("nanoid");
const argon2 = require("argon2");
const User = require("./models/User");
const Message = require("./models/Message");

// Writing what each function actually returns. This should be from mongoDB
const resolvers = {
  Query: {
    links: () => Link.find(),
    link_by_short_url: async (_, { Short_URL, Expires_At }) => {
      if (Expires_At === undefined) {
        return Link.findOne({ Short_URL: Short_URL });
      }
      return Link.findOne({
        Short_URL: Short_URL,
        $or: [
          { Expires_At: { $gt: Expires_At } },
          { Expires_At: { $eq: null } },
        ],
      });
    },
    link_by_base_url: (_, { Base_URL }) =>
      Link.find({ Base_URL: Base_URL, Created_By: null }),
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
    createLink: (_, { Created_By, Expires_At, Base_URL, Short_ID }) => {
      let expiry_date = null;
      if (!(Expires_At === undefined || Expires_At === -1)) {
        let current_date = new Date();
        expiry_date = current_date.getTime() + Expires_At;
      }

      let short_id = Short_ID === undefined ? nanoid(7) : Short_ID;
      const link = new Link({
        Created_By: Created_By === undefined ? null : Created_By,
        Created_At: new Date(),
        Expires_At: expiry_date,
        Base_URL: Base_URL,
        Short_URL: short_id,
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
    createMessage: async (_, message_details) => {
      console.log(message_details);
      if (message_details.Name.length === 0) {
        return {
          errors: [{ field: "name", message: "that name is too short" }],
        };
      }

      if (message_details.Email.length <= 5) {
        return {
          errors: [{ field: "email", message: "that email is too short" }],
        };
      }

      if (message_details.Message.length === 0) {
        return {
          errors: [{ field: "message", message: "that message is too short" }],
        };
      }

      let subject =
        message_details.Subject === "" ? "No Subject" : message_details.Subject;

      const message = new Message({
        Sent_At: new Date(),
        Name: message_details.Name,
        Email: message_details.Email,
        Subject: subject,
        Message: message_details.Message,
      });
      message.save();
      return { message: message };
    },
  },
};

module.exports = resolvers;
