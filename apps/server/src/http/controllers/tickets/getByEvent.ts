import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getTicketsByEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEventParamsSchema = z.object({
    eventId: z.string(),
  })

  const { eventId } = getEventParamsSchema.parse(request.params)

  const tickets = await prisma.ticket.findMany({
    where: {
      event_id: eventId,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return reply.send({ tickets })
}
