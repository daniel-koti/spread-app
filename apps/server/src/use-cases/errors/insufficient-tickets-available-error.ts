export class InsufficientTicketsAvailableError extends Error {
  constructor() {
    super('Has no more tickets available')
  }
}
