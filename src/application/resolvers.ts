import { TicketRepository } from '../domain/TicketRepository';

export const createResolvers = (ticketRepository: TicketRepository) => ({
  tickets: async ({ eventId }: { eventId: number }) => {
    return ticketRepository.getTickets(eventId);
  },
});