import { Ticket } from './Ticket';
export interface TicketRepository {
    getTickets(eventId: number): Promise<Ticket[]>;
  }