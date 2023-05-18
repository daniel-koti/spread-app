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

  const coupons = await prisma.coupon.findMany({
    where: {
      event_id: eventId,
    },
    select: {
      id: true,
      price: true,
      coupon_type: {
        select: {
          name: true,
        },
      },
    },
  })

  return reply.status(200).send({
    event,
    coupons,
  })
}
