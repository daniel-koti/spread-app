import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { incomeUserWallet } from './incomeUserWallet'
import { incomeProducerWallet } from './incomeProducerWallet'
import { getTransactionsByProducer } from './getTransactionsByProducer'
import { getTransactionsByUser } from './getTransactionsByUser'

export async function transactionsRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.get(
    '/transactionsUser',
    { onRequest: [verifyJWT] },
    getTransactionsByUser,
  )

  app.get(
    '/transactionsProducer',
    { onRequest: [verifyJWT] },
    getTransactionsByProducer,
  )

  app.post('/wallet/income-users', { onRequest: [verifyJWT] }, incomeUserWallet)
  app.post(
    '/wallet/income-producers',
    { onRequest: [verifyJWT] },
    incomeProducerWallet,
  )
}
