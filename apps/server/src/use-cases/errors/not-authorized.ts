export class NotAuthorizedError extends Error {
  constructor() {
    super('Unauthorized')
  }
}
