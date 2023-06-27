import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyFormBody from '@fastify/formbody'
import cors from '@fastify/cors'

import { env } from './env'
import { ZodError } from 'zod'

import { usersRoutes } from './http/controllers/users/routes'

import { eventsRoutes } from './http/controllers/events/routes'
import { couponsRoutes } from './http/controllers/coupons/routes'
import { discloseRoutes } from './http/controllers/discloses/routes'
import { ticketRoutes } from './http/controllers/tickets/routes'
import { transactionsRoutes } from './http/controllers/transactions/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'

export const app = fastify({
  bodyLimit: 30 * 1024 * 1024,
})

app.register(cors, {
  credentials: true,
  origin: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1440m', // 24 hours
  },
})

app.register(fastifyFormBody)
app.register(fastifyCookie)

app.register(categoriesRoutes)
app.register(transactionsRoutes)
app.register(ticketRoutes)
app.register(discloseRoutes)
app.register(couponsRoutes)
app.register(usersRoutes)
app.register(eventsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_COOKIE') {
    return reply
      .status(401)
      .send({ message: 'Invalid JWT token', code: error.code })
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal errors message' })
})
