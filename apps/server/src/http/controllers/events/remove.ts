import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const getEventParamsSchema = z.object({
    eventId: z.string(),
  })

  const { eventId } = getEventParamsSchema.parse(request.params)

  await prisma.coupon.deleteMany({
    where: {
      event_id: eventId,
    },
  })

  await prisma.event.delete({
    where: {
      id: eventId,
    },
  })

  return reply.status(200).send()
}
