require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const AuthPayload = require('./resolvers/AuthPayload');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');

const logger = require('./utils/logger.utils')();

const resolvers = {
  AuthPayload,
  Mutation,
  Query,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.DB_SECRET,
      debug: true,
    }),
  }),
});

server.start(() => logger.log('Server is running on port 4000'));
