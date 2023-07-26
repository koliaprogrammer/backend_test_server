import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Ticket {
    section: String
    row: String
    seatNumber: Int
    price: Float
  }

  type Query {
    tickets(eventId: Int!): [Ticket]
  }
`);