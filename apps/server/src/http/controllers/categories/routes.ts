import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetch } from './fetch'

export async function categoriesRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.get('/categories', { onRequest: [verifyJWT] }, fetch)
}
