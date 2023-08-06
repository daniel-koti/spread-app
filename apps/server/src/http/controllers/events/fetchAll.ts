import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchEventsDisclosedUseCase } from '@/use-cases/factories/make-fetch-events-disclosed-use-case'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllEventsUseCase = makeFetchEventsDisclosedUseCase()

  try {
    const events = await fetchAllEventsUseCase.execute()

    return reply.status(200).send(events)
  } catch (error) {
    return reply.status(400)
  }
}
