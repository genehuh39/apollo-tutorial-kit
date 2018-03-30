import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';

const app = express();

const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = 'service:genehuh39-7620:D2s8aMf905zj259E-xEelw';

const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY
});


app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use(compression());
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    // This option turns on tracing
    tracing: true
}));

engine.listen({
    port: GRAPHQL_PORT,
    graphqlPaths: ['/api/graphql'],
    expressApp: app,
    launcherOptions: {
        startupTimeout: 3000,
    },
}, () => {
    console.log('Listening!');
});
