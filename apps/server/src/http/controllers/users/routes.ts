import { FastifyInstance } from 'fastify'
import { registerUser } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/users/sessions', authenticate)

  app.patch('/users/token/refresh', refresh)

  /**
   * Authenticated routes
   */

  app.get('/users/me', { onRequest: [verifyJWT] }, profile)
}
