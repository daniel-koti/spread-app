import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'

import { env } from './env'
import { ZodError } from 'zod'

import { usersRoutes } from './http/controllers/users/routes'
import { producersRoutes } from './http/controllers/producers/routes'
import { eventsRoutes } from './http/controllers/events/routes'
import { couponsRoutes } from './http/controllers/coupons/routes'
import { discloseRoutes } from './http/controllers/discloses/routes'
import { ticketRoutes } from './http/controllers/tickets/routes'
import { transactionsRoutes } from './http/controllers/transactions/routes'
import { categoriesRoutes } from './http/controllers/cateogories/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(cors)

app.register(fastifyCookie)

app.register(categoriesRoutes)
app.register(transactionsRoutes)
app.register(ticketRoutes)
app.register(discloseRoutes)
app.register(couponsRoutes)
app.register(usersRoutes)
app.register(eventsRoutes)
app.register(producersRoutes)

app.setErrorHandler((error, _, reply) => {
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
