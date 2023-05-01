import { makeFetchEventsByProducerUseCase } from '@/use-cases/factories/make-fetch-events-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function filterEventsByProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const producerId = request.user.sub

  const fetchEventByIdUseCase = makeFetchEventsByProducerUseCase()

  const events = await fetchEventByIdUseCase.execute({
    producerId,
  })

  return reply.status(200).send(events)
}
