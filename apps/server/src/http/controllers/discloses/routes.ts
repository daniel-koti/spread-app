import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'

export async function discloseRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.post('/events/disclose', { onRequest: [verifyJWT] }, create)
}
