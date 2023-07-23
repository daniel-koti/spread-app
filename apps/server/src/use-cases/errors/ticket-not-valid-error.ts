export class TicketNoValidError extends Error {
  constructor() {
    super('Ticket is invalid')
  }
}
