import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { getTicketsByUser } from './getByUser'
import { getTicketsByEvent } from './getByEvent'
import { validate } from './validate'

export async function ticketRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.post('/buy-ticket', { onRequest: [verifyJWT] }, create)
  app.post('/validate-ticket', { onRequest: [verifyJWT] }, validate)
  app.get('/tickets/user', { onRequest: [verifyJWT] }, getTicketsByUser)
  app.get('/tickets/:eventId', { onRequest: [verifyJWT] }, getTicketsByEvent)
}
