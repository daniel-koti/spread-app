import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchTypes(request: FastifyRequest, reply: FastifyReply) {
  const couponsTypes = await prisma.couponType.findMany()

  return reply.status(200).send({
    couponsTypes,
  })
}
