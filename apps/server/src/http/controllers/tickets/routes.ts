import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { getTicketsByUser } from './getByUser'
import { getTicketsByEvent } from './getByEvent'

export async function ticketRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.post('/events/:eventId/ticket', { onRequest: [verifyJWT] }, create)
  app.get('/tickets/user', { onRequest: [verifyJWT] }, getTicketsByUser)
  app.get('/tickets/:eventId', { onRequest: [verifyJWT] }, getTicketsByEvent)
}
