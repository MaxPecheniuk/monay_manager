import { typeDefs } from './graphql/schema';
import resolvers from './graphql/resolvers/rootResolver';

const hapiPlayground = require('graphql-playground-middleware-hapi');
const {ApolloServer} = require('apollo-server-hapi');
const Hapi = require('hapi');
import mongoose from 'mongoose';

let port = 9080; // dev port
if (process.env.NODE_ENV === 'production') {
  port = 8080;
}
mongoose.connect('mongodb+srv://admin:1@market-gvfjg.mongodb.net/market?retryWrites=true&w=majority');

export const db = mongoose.connection;

db.once('open', () => {
  // eslint-disable-next-line
  console.info('DATABASE connected!!');
});
db.on('error', () => {
  // eslint-disable-next-line
  console.error('ERROR connection to database');
});

async function StartServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
      apiKey: 'service:MaxPecheniuk-6202:jBV5wMCF7tnifsnWwVMrRA'
    }
  });

  const app = new Hapi.server({
    port: port
  });

  await app.register(
    [
      {
        plugin: require('./plugins/cssHook')
      },
      {
        // console information
        plugin: require('hapi-pino'),
        options: {
          prettyPrint: true,
          logEvents: ['response', 'onPostStart']
        }
      },
      {
        // static file
        plugin: require('inert')
      },
      {
        plugin: require('./plugins/routes')
      },
      {
        plugin: require('@hapi/vision')
      },
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: 'Market API Documentation'
          }
        }

      }
    ]);

  // graphql playground localhost:9080/graphql
  const playground = {
    plugin: hapiPlayground,
    options: {
      path: '/playground',
      endpoint: '/graphiql'
    },
  };

  await server.applyMiddleware({app, playground});

  await server.installSubscriptionHandlers(app.listener);
  await app.start();

}

// eslint-disable-next-line
StartServer().catch(error => console.log(error));
