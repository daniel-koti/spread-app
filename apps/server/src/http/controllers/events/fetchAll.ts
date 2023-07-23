import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchAllEventsUseCase } from '../../../use-cases/factories/make-fetch-all-events-use-case'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllEventsUseCase = makeFetchAllEventsUseCase()

  try {
    const events = await fetchAllEventsUseCase.execute()

    return reply.status(200).send(events)
  } catch (error) {
    return reply.status(400)
  }
}
