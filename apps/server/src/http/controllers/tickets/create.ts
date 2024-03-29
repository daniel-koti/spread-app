import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeBuyTicketUseCase } from '@/use-cases/factories/make-buy-ticket-use-case'
import { InsufficientFundsInWalletError } from '@/use-cases/errors/insufficient-funds-in-wallet-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const buyTicketBodySchema = z.object({
    couponId: z.string(),
    eventId: z.string(),
  })

  const { couponId, eventId } = buyTicketBodySchema.parse(request.body)

  const buyTicketUseCase = makeBuyTicketUseCase()

  try {
    const ticket = await buyTicketUseCase.execute({
      event_id: eventId,
      coupon_id: couponId,
      user_id: request.user.sub,
    })

    return reply.status(201).send(ticket)
  } catch (error) {
    if (error instanceof InsufficientFundsInWalletError) {
      return reply.status(400).send({ message: error.message })
    } else {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
    }

    throw error
  }
}
