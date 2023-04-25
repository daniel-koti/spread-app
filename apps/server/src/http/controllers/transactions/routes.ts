import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { incomeUserWallet } from './incomeUserWallet'

export async function transactionsRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.post('/wallet/income-users', { onRequest: [verifyJWT] }, incomeUserWallet)
}
