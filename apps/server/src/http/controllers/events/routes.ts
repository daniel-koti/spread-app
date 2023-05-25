import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetchAll } from './fetchAll'
import { findById } from './findById'

import { filterEventsByCategory } from './filterEventsByCategory'
import { filterEventsByProducer } from './filterEventsByProducer'
import { update } from './update'
import { remove } from './remove'

export async function eventsRoutes(app: FastifyInstance) {
  /**
   * Authenticated routes
   */

  app.put('/event/update', { onRequest: [verifyJWT] }, update)
  app.delete('/event/remove/:eventId', { onRequest: [verifyJWT] }, remove)

  app.post('/events', { onRequest: [verifyJWT] }, create)
  app.get('/events', { onRequest: [verifyJWT] }, fetchAll)
  app.get('/events/:eventId', { onRequest: [verifyJWT] }, findById)
  app.get(
    '/events/producer',
    { onRequest: [verifyJWT] },
    filterEventsByProducer,
  )
  app.post(
    '/events/category',
    { onRequest: [verifyJWT] },
    filterEventsByCategory,
  )
}
