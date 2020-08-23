const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
require("dotenv").config();
const redis = require("redis");
const session = require("express-session");
const cors = require("cors");

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    name: "qid",
    store: new RedisStore({ client: redisClient, disableTouch: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // decade
      httpOnly: true, // cannot be accessed by frontend
      sameSite: "lax", // IDK what this does, should research it
    },
    secret: "myrandomstringwhichiwillputintoanenvvariablelaterlol",
    resave: false,
    saveUninitialized: false,
  })
);

// Connecting to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB db connection established");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res };
  },
});

server.applyMiddleware({ app, cors: false });

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
