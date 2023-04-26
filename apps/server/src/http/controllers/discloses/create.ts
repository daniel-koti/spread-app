import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDiscloseEventUseCase } from '../../../use-cases/factories/make-disclose-event-use-case'
import { InsufficientFundsInWalletError } from '@/use-cases/errors/insufficient-funds-in-wallet'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const discloseParamsSchema = z.object({
    eventId: z.string(),
  })

  const { eventId } = discloseParamsSchema.parse(request.body)

  const createDiscloseUseCase = makeDiscloseEventUseCase()

  try {
    const disclose = await createDiscloseUseCase.execute({
      event_id: eventId,
      producer_id: request.user.sub,
    })

    return reply.status(201).send(disclose)
  } catch (error) {
    if (error instanceof InsufficientFundsInWalletError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
