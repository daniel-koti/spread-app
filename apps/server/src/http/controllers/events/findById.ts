import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const getEventParamsSchema = z.object({
    eventId: z.string(),
  })

  const { eventId } = getEventParamsSchema.parse(request.params)

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
  })

  return reply.status(200).send({
    event,
  })
}
