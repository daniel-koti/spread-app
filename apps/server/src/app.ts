import { env } from './env'
import fastify from 'fastify'
import { ZodError } from 'zod'

export const app = fastify()

app.get('/', (request, reply) => {
  return 'Hello world'
})

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

  return reply.status(500).send({ message: 'Internal error message' })
})
