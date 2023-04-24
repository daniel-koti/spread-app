import { makeFetchEventsByProducerUseCase } from '@/use-cases/factories/make-fetch-events-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function filterEventsByProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByProducerParamsSchema = z.object({
    producerId: z.string(),
  })

  const { producerId } = fetchByProducerParamsSchema.parse(request.params)

  const fetchEventByIdUseCase = makeFetchEventsByProducerUseCase()

  const events = await fetchEventByIdUseCase.execute({
    producerId,
  })

  return reply.status(200).send(events)
}
