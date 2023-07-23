import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { approveTransaction } from './approve-transaction'
import { rejectTransaction } from './reject-transaction'

export async function adminRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.post(
    '/transaction-approve',
    { onRequest: [verifyJWT] },
    approveTransaction,
  )

  app.post('/transaction-reject', { onRequest: [verifyJWT] }, rejectTransaction)
}
