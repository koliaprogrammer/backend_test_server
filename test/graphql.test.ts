import request from 'supertest';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from '../src/application/schema';
import { createResolvers } from '../src/application/resolvers';
import { MyLaphilTicketRepository } from '../src/adapters/MyLaphilTicketRepository';

describe('GraphQL API', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();

    const ticketRepository = new MyLaphilTicketRepository();
    const rootValue = createResolvers(ticketRepository);

    app.use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue,
      })
    );
  });

  it('returns tickets for a given event ID', async () => {
    const eventId = 1195;
    const query = `
      query GetTickets($eventId: Int!) {
        tickets(eventId: $eventId) {
          section
          row
          seatNumber
          price
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query, variables: { eventId } });

    expect(response.status).toBe(200);
    expect(response.body.data.tickets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          section: expect.any(String),
          row: expect.any(String),
          seatNumber: expect.any(Number),
          price: expect.any(Number),
        }),
      ])
    );
  }, 10000);
});