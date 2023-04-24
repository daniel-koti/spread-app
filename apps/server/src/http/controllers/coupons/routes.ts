import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'

export async function couponsRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.post('/coupons', { onRequest: [verifyJWT] }, create)
}
