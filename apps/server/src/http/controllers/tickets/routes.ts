import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'

export async function ticketRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.post('/events/:eventId/ticket', { onRequest: [verifyJWT] }, create)
}
