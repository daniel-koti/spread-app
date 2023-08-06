import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { authenticateAdmin } from './authenticate-admin'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/sessions-admin', authenticateAdmin)

  app.patch('/token/refresh', refresh)

  /**
   * Authenticated routes
   */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
