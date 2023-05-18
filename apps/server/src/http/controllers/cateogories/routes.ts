import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchAll } from './fetchAll'

export async function categoriesRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.get('/categories', { onRequest: [verifyJWT] }, fetchAll)
}
