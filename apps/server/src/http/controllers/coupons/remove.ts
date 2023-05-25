import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const getEventParamsSchema = z.object({
    couponId: z.string(),
  })

  const { couponId } = getEventParamsSchema.parse(request.params)

  await prisma.coupon.delete({
    where: {
      id: couponId,
    },
  })

  return reply.status(200).send()
}
