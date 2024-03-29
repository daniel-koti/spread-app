import { makeCreateEventUseCase } from '../../../use-cases/factories/make-create-event-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { NotAuthorizedError } from '@/use-cases/errors/not-authorized'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().nullable(),
    date_start: z.string().datetime(),
    date_end: z.string().datetime(),
    hour_start: z.string(),
    hour_end: z.string(),
    address: z.string(),
    tickets_qtd: z.number(),
    category_id: z.string(),
    type: z.enum(['PERSON', 'ONLINE']),
  })

  const {
    title,
    description,
    address,
    category_id,
    date_end,
    date_start,
    hour_end,
    hour_start,
    tickets_qtd,
    image,
    type,
  } = requestBodySchema.parse(request.body)

  const authenticatedProfile = request.user.sub

  const createEventUseCase = makeCreateEventUseCase()

  try {
    await createEventUseCase.execute({
      title,
      description,
      address,
      category_id,
      date_end: new Date(date_end),
      date_start: new Date(date_start),
      hour_end,
      hour_start,
      image,
      type,
      tickets_qtd,
      user_id: authenticatedProfile,
    })
  } catch (error) {
    if (error instanceof NotAuthorizedError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
