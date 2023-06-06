import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { incomeTransaction } from './income'

import { getTransactionsByUserId } from './getByUserId'

export async function transactionsRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.get(
    '/transactions/user',
    { onRequest: [verifyJWT] },
    getTransactionsByUserId,
  )

  app.post(
    '/transactions/income',
    { onRequest: [verifyJWT] },
    incomeTransaction,
  )
}
