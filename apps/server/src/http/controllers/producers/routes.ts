import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function producersRoutes(app: FastifyInstance) {
  app.post('/producers', register)
  app.post('/producers/sessions', authenticate)

  app.patch('/producers/token/refresh', refresh)

  /**
   * Authenticated routes
   */

  app.get('/producers/me', { onRequest: [verifyJWT] }, profile)
}
