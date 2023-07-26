import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './application/schema';
import { createResolvers } from './application/resolvers';
import { MyLaphilTicketRepository } from './adapters/MyLaphilTicketRepository';

const app = express();
const port = process.env.PORT || 5000;
const ticketRepository = new MyLaphilTicketRepository();
const rootValue = createResolvers(ticketRepository);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Running server on${port}`));