import { makeFetchEventsByCategoryUseCase } from '@/use-cases/factories/make-fetch-events-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function filterEventsByCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByCategoryBodySchema = z.object({
    categoryId: z.string(),
  })

  const { categoryId } = fetchByCategoryBodySchema.parse(request.body)

  const fetchEventByIdUseCase = makeFetchEventsByCategoryUseCase()

  const events = await fetchEventByIdUseCase.execute({
    categoryId,
  })

  return reply.status(200).send(events)
}
