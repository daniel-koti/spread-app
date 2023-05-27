import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetchTypes } from './fetchTypes'
import { remove } from './remove'

export async function couponsRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.delete('/coupon/:couponId', { onRequest: [verifyJWT] }, remove)

  app.post('/coupon', { onRequest: [verifyJWT] }, create)
  app.get('/coupon/types', { onRequest: [verifyJWT] }, fetchTypes)
}
