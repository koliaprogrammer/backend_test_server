import puppeteer from 'puppeteer';
import { Ticket } from '../domain/Ticket';
import { TicketRepository } from '../domain/TicketRepository';

export class MyLaphilTicketRepository implements TicketRepository {
  async getTickets(eventId: number): Promise<Ticket[]> {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(`https://my.laphil.com/en/syos2/package/${eventId}`);

    await page.click('#bestAvailable');
    await page.waitForSelector('#continueButton');
    await page.click('#continueButton');

    await page.waitForSelector('.ticket');
    const tickets = await page.evaluate(() => {
        const ticketElements = document.querySelectorAll('.ticket');
        return Array.from(ticketElements, (ticket: Element) => ({
          section: ticket.querySelector('.section')!.textContent as string,
          row: ticket.querySelector('.row')!.textContent as string,
          seatNumber: parseInt(ticket.querySelector('.seatNumber')!.textContent ?? '0'),
          price: parseFloat(ticket.querySelector('.price')!.textContent ?? '0'),
        }));
      });

    await browser.close();
    return tickets;
  }
}