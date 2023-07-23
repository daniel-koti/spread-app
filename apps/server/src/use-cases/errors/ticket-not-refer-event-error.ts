export class TicketNoReferEventError extends Error {
  constructor() {
    super('Ticket Not found in this event')
  }
}
