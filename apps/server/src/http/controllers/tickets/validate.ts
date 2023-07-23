import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateTicketUseCase } from '../../../use-cases/factories/make-validate-ticket-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateTransactionBodySchema = z.object({
    eventId: z.string(),
    ticketId: z.string(),
    option: z.enum(['VALID', 'INVALID']),
  })

  const { eventId, ticketId, option } = validateTransactionBodySchema.parse(
    request.body,
  )

  const validateTicketUseCase = makeValidateTicketUseCase()

  try {
    await validateTicketUseCase.execute({
      eventId,
      ticketId,
      option,
    })

    return reply.status(200).send()
  } catch (error) {
    return reply.status(400)
  }
}
