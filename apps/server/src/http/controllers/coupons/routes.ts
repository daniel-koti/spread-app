import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetchTypes } from './fetchTypes'
import { remove } from './remove'

export async function couponsRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.delete('/coupon/remove/:couponId', { onRequest: [verifyJWT] }, remove)

  app.post('/coupons', { onRequest: [verifyJWT] }, create)
  app.get('/couponTypes', { onRequest: [verifyJWT] }, fetchTypes)
}
